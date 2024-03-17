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

@Component({
  selector: 'app-budget-page',
  standalone: true,
  imports: [HttpClientModule, BudgetStructureComponent, TransactionComponent, TransactionFormComponent, CdkAccordionModule],
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit {
  expandedIndex = 0;
  totalAccount: number = 0;

  transactions: Transaction[] = [];
  accounts: Account[] = [];

  constructor(
    private transactionService: TransactionService, 
    private accountService: AccountService, 
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.userService.getUserAccounts(this.getActualIdUser()).subscribe(accounts => {
      this.accounts = accounts;
      accounts.forEach(acc => {
        this.transactionService.getTransactionByAccountId(acc.id).subscribe(transactions => {
          console.log('transactions', this.transactions = transactions);
        });
      })
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
