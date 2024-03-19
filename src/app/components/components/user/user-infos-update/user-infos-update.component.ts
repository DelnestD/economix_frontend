import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User, UserService } from '../../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-infos-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-infos-update.component.html',
  styleUrl: '../../../../../styles.css',
})
export class UserInfosUpdateComponent {
  showPassword: boolean = false;
  showErrorMessage: boolean = false;

  updateUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  declare actualUser: User;

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {
    userService.getUserById(this.getActualIdUser()).subscribe((user) => {
      this.actualUser = user;
      this.updateUserForm.setValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
      });
    });
  }

  onSubmit() {
    bcrypt.compare(
      this.updateUserForm.value.password!,
      this.actualUser.password!,
      (err, res) => {
        if (res) {
          const updatedUser: User = {
            id: this.actualUser.id,
            firstName: this.updateUserForm.value.firstName!,
            lastName: this.updateUserForm.value.lastName!,
            email: this.updateUserForm.value.email!,
          };
          //? check email ?
          this.userService.updateUser(updatedUser).subscribe((user) => {
            Swal.fire({
              title: 'Modifications enregistrées',
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#28A745',
            });
          });
        } else {
          Swal.fire({
            title: 'Mot de passe incorrect',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#DC3545',
          });
        }
      }
    );
  }

  get EmailControl() {
    return this.updateUserForm.get('email') as FormControl;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
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
