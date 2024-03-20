import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormRecord,
  FormsModule,
  ReactiveFormsModule,
  Validators,
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

  constructor(private transactionService: TransactionService) {}

  formValid: boolean = true;

  transactionFrom = new FormGroup({
    account: new FormControl(''),
    budget: new FormControl(''),
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    category: new FormControl(''),
  });

  getTitle() {
    return this.transactionFrom.get('title') as FormControl;
  }
  getDate() {
    return this.transactionFrom.get('date') as FormControl;
  }
  getAmount() {
    return this.transactionFrom.get('amount') as FormControl;
  }

  ngOnInit() {
    if (!this.createNew) {
      const date = new Date(this.transactionToUpdate!.date);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateFormated = `${year}-${month}-${day}`;

      let amountToUpdate = this.transactionToUpdate!.amount;
      let categoryToUpdate;
      if (this.transactionToUpdate!.isRefill) {
        this.transactionToUpdate!.amount *= -1;
        categoryToUpdate = 'refill';
      } else if (amountToUpdate < 0) {
        categoryToUpdate = 'spend';
        amountToUpdate *= -1;
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
    if (
      this.getTitle().status === 'INVALID' ||
      this.getDate().status === 'INVALID' ||
      this.getAmount().status === 'INVALID'
    ) {
      this.formValid = false;
    } else {
      const formValue = this.transactionFrom.value;

      const accountUpdated = { id: formValue.account as string };
      let budgetUpdated;
      formValue.budget === ''
        ? (budgetUpdated = null)
        : (budgetUpdated = { id: formValue.budget as string });

      let amountUpdated = parseFloat(formValue.amount as string);
      if (formValue.category === 'spend') {
        amountUpdated *= -1;
      }

      let refillUpdated = false;
      if (formValue.category === 'refill') {
        refillUpdated = true;
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
        this.transactionService
          .insertTransaction(transactionCreated)
          .subscribe(() => window.location.reload());
      } else {
        const transactionCreated = {
          id: this.transactionToUpdate!.id,
          title: formValue!.title as string,
          amount: Number(amountUpdated),
          date: formValue.date as string,
          account: accountUpdated,
          budget: budgetUpdated,
          isRefill: refillUpdated,
        };
        this.transactionService
          .update(transactionCreated)
          .subscribe(() => window.location.reload());
      }
    }
  }

  closeModal() {
    this.close.emit();
  }
}
