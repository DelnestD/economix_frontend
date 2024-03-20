import { Component, OnInit } from '@angular/core';
import { BudgetStructureComponent } from '../../components/budget-structure/budget-structure.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import {
  Transaction,
  TransactionService,
} from '../../../services/transaction.service';
import { Account } from '../../../services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Budget } from '../../../services/budget.service';
import { FormBudgetComponent } from './form-budget/form-budget.component';
import { CommonModule } from '@angular/common';
import { FormTransactionComponent } from './form-transaction/form-transaction.component';
import { FormAccountComponent } from './form-account/form-account.component';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    BudgetStructureComponent,
    TransactionComponent,
    CdkAccordionModule,
    FormTransactionComponent,
    FormAccountComponent,
    FormBudgetComponent,
  ],
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css',
})
export class BudgetPageComponent implements OnInit {
  expandedIndex = 0;
  totalAccount: number[] = [];
  totalBudget: number[] = [];

  transactionsAccount: Transaction[][] = [];
  transactionsBudget: Transaction[][] = [];
  accounts: Account[] = [];
  budgets: Budget[] = [];

  showModal: string = '';
  createNew: boolean = true;

  declare accountToUpdate: Account | undefined;
  declare budgetToUpdate: Budget | undefined;
  declare transactionToUpdate: Transaction | undefined;

  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loadTransactionsAccount();
    this.loadTransactionsBudget();
  }

  setType(param: string): string {
    return param;
  }

  loadTransactionsAccount() {
    this.userService
      .getUserAccounts(this.getActualIdUser())
      .subscribe((accounts) => {
        this.accounts = accounts;
        for (let i = 0; i < accounts.length; i++) {
          this.totalAccount[i] = 0;
          this.transactionService
            .getTransactionByAccountId(accounts[i].id!)
            .subscribe((transactions) => {
              this.transactionsAccount[i] = transactions;
              transactions.map((transaction) => {
                this.totalAccount[i] += transaction.amount;
              });
            });
        }
      });
  }

  loadTransactionsBudget() {
    this.userService
      .getUserBudgets(this.getActualIdUser())
      .subscribe((budgets) => {
        this.budgets = budgets;
        for (let i = 0; i < budgets.length; i++) {
          this.totalBudget[i] = 0;
          this.transactionService
            .getTransactionByBudgetId(budgets[i].id)
            .subscribe((transactions) => {
              this.transactionsBudget[i] = transactions;
              transactions.map((transaction) => {
                this.totalBudget[i] += transaction.amount;
              });
            });
        }
      });
  }

  modalUpdate(event: { type: string; id: string; accountId?: string }) {
    if (event.type === 'account') {
      this.accountToUpdate = this.accounts.find(
        (account) => account.id === event.id
      );
    }
    if (event.type === 'budget') {
      this.budgetToUpdate = this.budgets.find(
        (budget) => budget.id === event.id
      );
    }
    if (event.type === 'transaction') {
      let res = this.transactionsAccount.map((account) =>
        account.find((transaction) => transaction.id === event.id)
      );
      for (const item of res) {
        if (item !== undefined) this.transactionToUpdate = item;
      }
    }
    this.createNew = false;
    this.showModal = event.type;
  }

  modalNew(modal: string) {
    this.createNew = true;
    this.showModal = modal;
  }

  closeModal() {
    this.showModal = '';
  }

  getActualIdUser() {
    return this.getDecodedAccessToken(this.cookieService.get('accessToken')).id;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
