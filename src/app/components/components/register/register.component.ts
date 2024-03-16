import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmPassword } from '../../validators/password.validator';
import { RegisterService } from '../../../services/register.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;
  showErrorMessages: boolean = false;

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

  constructor(private registerService: RegisterService) {}

  onSubmit() {
    const newUser = {
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };
    this.registerService
      .register(newUser)
      .pipe(
        catchError((e: { status: number; message: string }) => {
          const errorMessage =
            e.status === 409 ? 'Email already exists' : e.message;
          document.getElementsByClassName('error-message')[0].innerHTML =
            'Un compte avec cet email existe déjà';
          this.showErrorMessages = true;
          return errorMessage;
        })
      )
      .subscribe((reponse) => {
        if (this.showErrorMessages === false) {
          console.log('User registered successfully');
        }
      });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleShowPasswordConfirmation() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }
}
