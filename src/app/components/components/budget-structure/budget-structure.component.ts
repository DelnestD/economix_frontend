import { Component } from '@angular/core';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'app-budget-structure',
  standalone: true,
  imports: [TransactionComponent],
  templateUrl: './budget-structure.component.html',
  styleUrl: './budget-structure.component.css'
})
export class BudgetStructureComponent {
  totalBudget: number = 0;
  titleBudget: string = "Budget 1";
}
