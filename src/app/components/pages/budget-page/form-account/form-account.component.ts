import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-account',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-account.component.html',
  styleUrl: './form-account.component.css',
})
export class FormAccountComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();

  @Input() createNew: boolean = false;

  constructor(private userService: UserService) {}

  createForm = new FormGroup(
    {
      compte: new FormControl(''),
    },
    [Validators.required]
  );

  submitForm() {
    throw new Error('Method not implemented.');
  }

  closeModal() {
    this.close.emit();
  }

  ngOnInit() {}
}
