import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmPassword } from '../../../validators/password.validator';
import { RegisterService } from '../../../../services/register.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: '../../../../../styles.css',
})
export class RegisterComponent {
  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;
  showErrorMessages: boolean = false;

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    passwordGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
        passwordConfirmation: new FormControl('', [Validators.required]),
      },
      confirmPassword
    ),
  });

  constructor(private registerService: RegisterService) {}

  onSubmit() {
    const newUser = {
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.passwordGroup?.password!,
    };
    this.registerService
      .register(newUser)
      .pipe(
        catchError((e: { status: number; message: string }) => {
          this.showErrorMessages = true;
          Swal.fire({
            title: 'Error!',
            text: 'Cette Email existe déjà ! Veuillez saisir un autre email',
            icon: 'error',
            confirmButtonColor: '#DC3545',
          });
          const errorMessage =
            e.status === 409 ? 'Email already exists' : e.message;
          return errorMessage;
        })
      )
      .subscribe((reponse) => {
        if (this.showErrorMessages === false) {
          Swal.fire({
            title: 'Success!',
            text: 'Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = '/login';
          });
        }
      });
  }

  get EmailControl() {
    return this.registerForm.get('email') as FormControl;
  }

  get PasswordGroupControl() {
    return this.registerForm.get('passwordGroup') as FormGroup;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleShowPasswordConfirmation() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }
}
