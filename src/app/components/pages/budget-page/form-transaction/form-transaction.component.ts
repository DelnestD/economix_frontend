import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormRecord,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Account, AccountService } from '../../../../services/account.service';
import { Budget, BudgetService } from '../../../../services/budget.service';
import {
  Transaction,
  TransactionService,
} from '../../../../services/transaction.service';

@Component({
  selector: 'app-form-transaction',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.css',
})
export class FormTransactionComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();

  @Input() createNew: boolean = false;
  @Input() accounts: Account[] = [];
  @Input() budgets: Budget[] = [];
  @Input() declare transactionToUpdate: Transaction | undefined;

  constructor(
    private accountService: AccountService,
    private budgetService: BudgetService,
    private transactionService: TransactionService
  ) {}

  transactionFrom = new FormGroup({
    account: new FormControl(''),
    budget: new FormControl(''),
    title: new FormControl(''),
    date: new FormControl(''),
    amount: new FormControl(''),
    category: new FormControl(''),
  });

  ngOnInit() {
    if (!this.createNew) {
      const date = new Date(this.transactionToUpdate!.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateFormated = `${year}-${month}-${day}`;

      let amountToUpdate = this.transactionToUpdate!.amount;
      let categoryToUpdate;
      if (amountToUpdate < 0) {
        categoryToUpdate = 'spend';
        amountToUpdate *= -1;
      } else if (this.transactionToUpdate!.isRefill) {
        categoryToUpdate = 'refill';
      } else {
        categoryToUpdate = 'received';
      }

      let budgetToUpdate;
      if (this.transactionToUpdate?.budget == null) {
        budgetToUpdate = '';
      } else {
        budgetToUpdate = this.transactionToUpdate!.budget.id;
      }

      this.transactionFrom.setValue({
        account: this.transactionToUpdate!.account.id,
        budget: budgetToUpdate,
        title: this.transactionToUpdate!.title,
        date: dateFormated,
        amount: amountToUpdate.toString(),
        category: categoryToUpdate,
      });
    } else {
      const date = new Date(Date.now());
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateFormated = `${year}-${month}-${day}`;

      this.transactionFrom.setValue({
        account: this.accounts[0].id,
        budget: '',
        title: '',
        date: dateFormated,
        amount: '',
        category: 'spend',
      });
    }
  }

  onSubmit() {
    const formValue = this.transactionFrom.value;

    const accountUpdated = { id: formValue.account as string };
    let budgetUpdated;
    formValue.budget === ''
      ? (budgetUpdated = null)
      : (budgetUpdated = { id: formValue.budget as string });

    let refillUpdated = false;
    if (formValue.category === 'refill') {
      refillUpdated = true;
    }
    let amountUpdated = parseFloat(formValue.amount as string);
    if (formValue.category === 'spend') {
      amountUpdated *= -1;
    }

    if (this.createNew) {
      const transactionCreated = {
        title: formValue!.title as string,
        amount: Number(amountUpdated),
        date: formValue.date as string,
        account: accountUpdated,
        budget: budgetUpdated,
        isRefill: refillUpdated,
      };
      this.transactionService.insertTransaction(transactionCreated).subscribe();
    }
  }

  closeModal() {
    this.close.emit();
  }
}
