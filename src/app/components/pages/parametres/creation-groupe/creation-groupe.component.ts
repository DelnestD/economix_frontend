import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-creation-groupe',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './creation-groupe.component.html',
  styleUrl: './creation-groupe.component.css'
})
export class CreationGroupeComponent {
  createGroupForm = new FormGroup(
    {
      name: new FormControl(''),
      
    },
    [Validators.required]
  );
}
