import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
