import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-role-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-role-update.component.html',
  styleUrl: '../../../../styles.css',
})
export class UserRoleUpdateComponent {
  usersList = new FormGroup(
    {
      user: new FormControl(''),
      member1: new FormControl(''),
      member2: new FormControl(''),
      member3: new FormControl(''),
    },
    [Validators.required]
  );
}
