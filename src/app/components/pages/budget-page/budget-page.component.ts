import { Component, OnInit } from '@angular/core';
import { BudgetStructureComponent } from '../../components/budget-structure/budget-structure.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { TransactionFormComponent } from '../../forms/transaction-form/transaction-form.component';
import { Transaction, TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  imports: [BudgetStructureComponent, TransactionComponent, TransactionFormComponent],
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit {
  totalCompte: number = 0;
  
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions;
  }
  
  loadTransactions() {
    this.transactionService.getTransactionByAccountId('1').subscribe(transactions => {
      this.transactions = transactions;
    })
  }

  showFormTransaction() {
    
  }
}
