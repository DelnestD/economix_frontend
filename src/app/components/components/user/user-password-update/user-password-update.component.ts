import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmPassword } from '../../validators/password.validator';

@Component({
  selector: 'app-user-password-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-password-update.component.html',
  styleUrl: '../../../../styles.css',
})
export class UserPasswordUpdateComponent {
  showOldPassword: boolean = false;
  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;
  updatePasswordForm = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required]),
      passwordCheckGroup: new FormGroup({
        password: new FormControl('', [Validators.required]),
        passwordConfirmation: new FormControl('', [Validators.required]),
      }),
    },
    [confirmPassword]
  );
  onSubmit() {
    console.log(this.updatePasswordForm.value);
  }

  get PasswordCheckGroupControl() {
    return this.updatePasswordForm.get('passwordCheckGroup') as FormGroup;
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
