import { Component, OnInit } from '@angular/core';
import { BudgetStructureComponent } from '../../components/budget-structure/budget-structure.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { TransactionFormComponent } from '../../forms/transaction-form/transaction-form.component';
import { Transaction, TransactionService } from '../../../services/transaction.service';
import { Account, AccountService } from '../../../services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { Budget, BudgetService } from '../../../services/budget.service';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  imports: [HttpClientModule, BudgetStructureComponent, TransactionComponent, TransactionFormComponent, CdkAccordionModule],
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit {
  expandedIndex = 0;
  totalAccount: number[] = [];
  totalBudget: number[] = [];

  transactionsAccount: Transaction[][] = [];
  transactionsBudget: Transaction[][] = [];
  accounts: Account[] = [];
  budgets: Budget[] = [];

  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loadTransactionsAccount();
    this.loadTransactionsBudget();
  }

  loadTransactionsAccount() {
    this.userService.getUserAccounts(this.getActualIdUser()).subscribe(accounts => {
      this.accounts = accounts;
      for (let i = 0; i <= accounts.length; i++) {
        this.totalAccount[i] = 0;
        this.transactionService.getTransactionByAccountId(accounts[i].id).subscribe(transactions => {
          this.transactionsAccount[i] = transactions;
          transactions.map(transaction => {
            this.totalAccount[i] += transaction.amount;
          });
        });
      }
    });
  }

  loadTransactionsBudget() {
    this.userService.getUserBudgets(this.getActualIdUser()).subscribe(budgets => {
      this.budgets = budgets;
      for (let i = 0; i <= budgets.length; i++) {
        this.totalBudget[i] = 0;
        this.transactionService.getTransactionByBudgetId(budgets[i].id).subscribe(transactions => {
          this.transactionsBudget[i] = transactions;
          transactions.map(transaction => {
            this.totalBudget[i] += transaction.amount;
          });
        });
      }
    });
  }

  getActualIdUser() {
    return this.getDecodedAccessToken(this.cookieService.get("accessToken")).id;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
  
}
