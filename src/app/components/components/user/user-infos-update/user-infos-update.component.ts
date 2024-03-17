import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User, UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-infos-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-infos-update.component.html',
  styleUrl: '../../../../../styles.css',
})
export class UserInfosUpdateComponent {
  showPassword: boolean = false;
  updateUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  declare actualUser: User;

  constructor(userService: UserService) {
    userService
      .getUserById('58595930-d57c-47fa-b704-25b0d0edf44e')
      .subscribe((user) => {
        console.log(user);

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
    console.log(this.updateUserForm.value);
  }

  get EmailControl() {
    return this.updateUserForm.get('email') as FormControl;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
