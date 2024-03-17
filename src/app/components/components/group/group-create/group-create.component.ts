import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-group-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './group-create.component.html',
  styleUrl: '../../../../../styles.css',
})
export class GroupCreateComponent {
  createGroupForm = new FormGroup(
    {
      name: new FormControl(''),
    },
    [Validators.required]
  );
}
