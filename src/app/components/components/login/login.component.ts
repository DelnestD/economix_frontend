import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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

  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', Validators.email),
      password: new FormControl(''),
    },
    [Validators.required]
  );

  onSubmit() {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value);
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    const tokenCookie = this.cookieService.get('accessToken');
    console.log('tokenCookie', tokenCookie);
    if (tokenCookie) {
      //TODO change route when view accound/budget is ready
      this.router.navigate(['/parameters']);
    } else {
      console.error('No token found');
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
