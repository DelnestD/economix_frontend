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
    this.transactionService.getTransactionByAccountId('f8646c26-f727-4c72-93d6-b7ef3a136003').subscribe(transactions => {
      this.transactions = transactions;
      console.log(this.transactions);
    })
  }
}
