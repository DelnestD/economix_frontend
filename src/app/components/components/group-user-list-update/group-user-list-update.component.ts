import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-group-user-list-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './group-user-list-update.component.html',
  styleUrl: '../../../../styles.css',
})
export class GroupUserListUpdateComponent {
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
