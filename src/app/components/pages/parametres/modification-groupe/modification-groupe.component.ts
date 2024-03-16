import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modification-groupe',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modification-groupe.component.html',
  styleUrl: '../../../../../styles.css',
})
export class ModificationGroupeComponent {
  updateGroupForm = new FormGroup(
    {
      newName: new FormControl(''),
    },
    [Validators.required]
  );
}
