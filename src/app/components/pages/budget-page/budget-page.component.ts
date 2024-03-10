import { Component } from '@angular/core';
import { BudgetStructureComponent } from '../../components/budget-structure/budget-structure.component';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { TransactionFormComponent } from '../../forms/transaction-form/transaction-form.component';

@Component({
  selector: 'app-budget-page',
  standalone: true,
  imports: [BudgetStructureComponent, TransactionComponent, TransactionFormComponent],
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent {
  totalCompte: number = 0;

  showFormTransaction() {
    
  }
}
