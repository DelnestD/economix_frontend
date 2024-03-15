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
  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;

  registerForm = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', Validators.email),
      password: new FormControl(''),
      passwordConfirmation: new FormControl(''),
    },
    [Validators.required, confirmPassword]
  );

  onSubmit() {
    console.log(this.registerForm.value);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleShowPasswordConfirmation() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }
}
