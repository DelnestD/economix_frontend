import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Account } from '../../../../services/account.service';
import { Budget } from '../../../../services/budget.service';

@Component({
  selector: 'app-form-transaction',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.css',
})
export class FormTransactionComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();

  @Input() createNew: boolean = false;
  @Input() accounts: Account[] = [];
  @Input() budgets: Budget[] = [];

  constructor(private userService: UserService) {}

  createForm = new FormGroup(
    {
      compte: new FormControl(''),
    },
    [Validators.required]
  );

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  closeModal() {
    this.close.emit();
  }

  ngOnInit() {}
}
