import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-group-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './group-update.component.html',
  styleUrl: '../../../../styles.css',
})
export class GroupUpdateComponent {
  updateGroupForm = new FormGroup(
    {
      newName: new FormControl(''),
    },
    [Validators.required]
  );
}
