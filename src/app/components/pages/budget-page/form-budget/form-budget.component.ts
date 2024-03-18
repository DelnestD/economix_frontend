import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Account, AccountService } from '../../../../services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-form-budget',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-budget.component.html',
  styleUrl: './form-budget.component.css',
})
export class FormBudgetComponent implements OnInit {
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
