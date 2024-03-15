import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-membres-liste',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './membres-liste.component.html',
  styleUrl: './membres-liste.component.css'
})
export class MembresListeComponent {
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

