import { Component, OnInit } from '@angular/core';
import { BudgetStructureComponent } from '../../components/budget-structure/budget-structure.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { TransactionFormComponent } from '../../forms/transaction-form/transaction-form.component';
import { Transaction, TransactionService } from '../../../services/transaction.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  imports: [BudgetStructureComponent, TransactionComponent, TransactionFormComponent, HttpClientModule],
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit {
  totalCompte: number = 0;
  
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }
  
  loadTransactions() {
    this.transactionService.getTransactionByAccountId('3996620d-b6cf-4cf8-a03a-684a1940e784').subscribe(transaction => {
      this.transactions = transaction;
      console.log(this.transactions);
    })
  }

  showFormTransaction() {

  }
}
