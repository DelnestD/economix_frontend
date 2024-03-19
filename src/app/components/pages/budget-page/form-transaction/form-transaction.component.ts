import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Account } from '../../../../services/account.service';
import { Budget } from '../../../../services/budget.service';
import { Transaction } from '../../../../services/transaction.service';

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
  @Input() declare transactionToUpdate: Transaction | undefined;

  constructor(private userService: UserService) {}

  transactionFrom = new FormGroup({
    account: new FormControl(''),
    budget: new FormControl(''),
    title: new FormControl(''),
    amount: new FormControl(''),
    category: new FormControl(''),
  });

  ngOnInit() {
    if (!this.createNew) {
      console.log(this.transactionToUpdate);
      this.transactionFrom.setValue({
        account: '',
        budget: '',
        title: this.transactionToUpdate!.title,
        amount: this.transactionToUpdate!.amount.toString(),
        category: '',
      });
      console.log(this.transactionToUpdate);
    }
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  closeModal() {
    this.close.emit();
  }
}
