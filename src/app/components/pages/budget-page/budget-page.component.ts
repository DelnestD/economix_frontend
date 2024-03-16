import { Component, OnInit } from '@angular/core';
import { BudgetStructureComponent } from '../../components/budget-structure/budget-structure.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { TransactionFormComponent } from '../../forms/transaction-form/transaction-form.component';
import { Transaction, TransactionService } from '../../../services/transaction.service';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from '../../../services/account.service';
import { jwtDecode } from "jwt-decode";
import { UserService } from '../../../services/user.service';
import { Collapse, Tooltip, initTWE } from 'tw-elements';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  imports: [HttpClientModule, BudgetStructureComponent, TransactionComponent, TransactionFormComponent],
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit {
  totalCompte: number = 0;
  
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService, private accountService: AccountService, private userService: UserService) {}

  ngOnInit(): void {
    initTWE({ Collapse });
    this.loadTransactions(); 
    console.log('getDecodeAccessToken', this.getDecodedAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyMGI3NzcxLTkxOGMtNDE3YS05ZjQwLWI3MDMzN2VjYTdiOCIsImlhdCI6MTcxMDYxMTg5OSwiZXhwIjoxNzEwNjEyMTk5fQ.jCvLKPVNCf6wiltpbkYlOCeLlqp6WFT7zy3BPziG2ak").id);
  }
  
  loadTransactions() {
    this.transactionService.getTransactionByAccountId('7134415e-d9fc-4208-8108-8cb47d433cad').subscribe(transactions => {
      this.transactions = transactions;
      // console.log('accountId', this.getAccountId().subscribe(accountId => {console.log(accountId);
      console.log('getCurrentIdUser', sessionStorage.getItem('id'));
    })
  }

  getAccountId() {
    return this.accountService.getAccountById('7134415e-d9fc-4208-8108-8cb47d433cad');
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
    
  }
}
