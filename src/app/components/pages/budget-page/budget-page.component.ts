import { Component, OnInit } from '@angular/core';
import { BudgetStructureComponent } from '../../components/budget-structure/budget-structure.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { TransactionFormComponent } from '../../forms/transaction-form/transaction-form.component';
import { Transaction, TransactionService } from '../../../services/transaction.service';
import { Account } from '../../../services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { Role, UserService } from '../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { Budget } from '../../../services/budget.service';
import { FormNewBudgetComponent } from './form-new-budget/form-new-budget.component';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  imports: [HttpClientModule, BudgetStructureComponent, TransactionComponent, TransactionFormComponent, CdkAccordionModule, FormNewBudgetComponent],
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit {
  roleActualUser: string = "";
  groupId: string = "";
  
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
    private cookieService: CookieService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.getActualGroupId();
    this.loadTransactionsAccount();
    this.loadTransactionsBudget();
    if (this.roleActualUser === "leader") {
      this.loadMembers();
    }
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

  loadMembers() {
    // this.userService.getUserByGroupId()
  }

  getGroupId() {
    this.userService.getUserById(this.getActualIdUser()).subscribe(user => {
      if (user.group) {
        this.userService.getUserByGroupId(this.groupId).subscribe(user => {
          console.log("user", user);
        })
      }
    })
  }

  getRoleActualUser() {
    this.userService.getUserById(this.getActualIdUser()).subscribe(user => {
      this.roleActualUser = user.role;
    })
  }

  getActualGroupId() {
    this.userService.getUserById(this.getActualIdUser()).subscribe(user => {
      if (user.group) {
        this.groupId = user.group.id;
      }
    })
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
