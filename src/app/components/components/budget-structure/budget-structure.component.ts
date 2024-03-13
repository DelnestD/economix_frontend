import { Component, OnInit } from '@angular/core';
import { TransactionComponent } from '../transaction/transaction.component';
import { Transaction, TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-budget-structure',
  standalone: true,
  imports: [TransactionComponent],
  templateUrl: './budget-structure.component.html',
  styleUrl: './budget-structure.component.css'
})
export class BudgetStructureComponent implements OnInit {
  totalBudget: number = 0;
  titleBudget: string = "Budget 1";

  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
  }
}
