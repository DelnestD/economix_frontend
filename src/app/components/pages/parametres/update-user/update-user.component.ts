import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmPassword } from '../../../validators/password.validator';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  showOldPassword : boolean = false;
  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;

  updateForm = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', Validators.email),
      oldPassword: new FormControl(''),
      password: new FormControl(''),
      passwordConfirmation: new FormControl(''),
    },
    [Validators.required, confirmPassword]
  );

  onSubmit() {
    console.log(this.updateForm.value);
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
}
