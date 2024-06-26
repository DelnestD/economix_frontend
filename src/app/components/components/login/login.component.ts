import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService, accessToken } from '../../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService
  ) {}
  showPassword: boolean = false;
  showErrorMessage: boolean = false;

  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', Validators.email),
      password: new FormControl(''),
    },
    [Validators.required]
  );

  onSubmit() {
    this.showErrorMessage = false;
    console.log(this.loginForm.value);
    this.loginService
      .login(this.loginForm.value)
      .pipe(
        catchError((e: { status: number; message: string }) => {
          const errorMessage =
            e.status === 401 ? 'Email or Password invalid' : e.message;
          this.showErrorMessage = true;
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
            this.router.navigate(['/parameters']);
          }
        }
      });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
