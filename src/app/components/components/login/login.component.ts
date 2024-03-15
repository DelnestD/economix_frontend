import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}
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
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
