import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmPassword } from '../../../validators/password.validator';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import bcrypt from 'bcryptjs';
import { User, UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-password-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-password-update.component.html',
  styleUrl: '../../../../../styles.css',
})
export class UserPasswordUpdateComponent {
  showOldPassword: boolean = false;
  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;
  showErrorMessage: boolean = false;
  declare errorMessage: HTMLElement;

  declare actualUser: User;

  updatePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    passwordCheckGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
        passwordConfirmation: new FormControl('', [Validators.required]),
      },
      [confirmPassword]
    ),
  });

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {
    userService.getUserById(this.getActualIdUser()).subscribe((user) => {
      this.actualUser = user;
    });
  }

  ngOnInit() {
    this.errorMessage = document.getElementsByClassName(
      'error-message'
    )[1] as HTMLElement;
    console.log(document.getElementsByClassName('error-message')[1]);
  }

  onSubmit() {
    console.log(this.errorMessage);

    if (this.checkSamePasswords()) {
      this.showErrorMessage = true;
      this.errorMessage.innerHTML = 'Les mots de passe sont identiques';
      console.error('Passwords are the same');
    } else {
      bcrypt.hash(
        this.updatePasswordForm.value.passwordCheckGroup!.password!,
        10,
        (err, hash) => {
          if (err) {
            console.error(err);
          } else {
            let userToUpdate: User = {
              id: this.actualUser.id,
              firstName: this.actualUser.firstName,
              lastName: this.actualUser.lastName,
              email: this.actualUser.email,
              password: hash,
            };
            bcrypt.compare(
              this.updatePasswordForm.value.oldPassword!,
              this.actualUser.password!,
              (err, res) => {
                if (res) {
                  this.userService
                    .updateUser(userToUpdate)
                    .subscribe((user) => {
                      console.log('Password updated');
                    });
                } else {
                  console.error('Password is not updated');
                  this.showErrorMessage = true;
                  this.errorMessage.innerHTML = 'Mot de passe incorrect';
                }
              }
            );
          }
        }
      );
    }
  }

  get PasswordCheckGroupControl() {
    return this.updatePasswordForm.get('passwordCheckGroup') as FormGroup;
  }

  checkSamePasswords() {
    if (
      this.updatePasswordForm.value.oldPassword ===
      this.updatePasswordForm.value.passwordCheckGroup?.password
    ) {
      return true;
    }
    return false;
  }

  toggleShowOldPassword() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowPasswordConfirmation() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }
  getActualIdUser() {
    return this.getDecodedAccessToken(this.cookieService.get('accessToken')).id;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
