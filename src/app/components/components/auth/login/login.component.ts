import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService, accessToken } from '../../../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: '../../../../../styles.css',
})
export class LoginComponent {
  constructor(
    private cookieService: CookieService,
    private loginService: LoginService
  ) {}
  showPassword: boolean = false;
  showErrorMessage: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.showErrorMessage = false;
    console.log(this.loginForm.value);
    this.loginService
      .login(this.loginForm.value)
      .pipe(
        catchError((e: { status: number; message: string }) => {
          this.showErrorMessage = true;
          Swal.fire({
            title: 'Error',
            text: 'Email ou mot de passe invalide',
            icon: 'error',
            confirmButtonColor: '#DC3545',
          });
          const errorMessage =
            e.status === 401 ? 'Email or Password invalid' : e.message;
          return errorMessage;
        })
      )
      .subscribe((response: string | accessToken) => {
        if (this.showErrorMessage === false) {
          console.log('User logged in successfully');
          console.log('response', response);
          if (typeof response !== 'string') {
            const expires = new Date(response.expires);
            this.cookieService.set(
              'accessToken',
              response.accessToken,
              expires,
              '/'
            );
            //TODO: redirect to the account/budget page
            //? windows location because reload also navbar
            window.location.href = '/budget';
          }
        }
      });
  }

  get EmailControl() {
    return this.loginForm.get('email') as FormControl;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
