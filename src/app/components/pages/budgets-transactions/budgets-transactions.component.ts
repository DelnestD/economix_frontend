import { Component } from '@angular/core';
import { StructureBudgetsComponent } from '../../components/structure-budgets/structure-budgets.component';

@Component({
  selector: 'app-budgets-transactions',
  standalone: true,
  imports: [StructureBudgetsComponent],
  templateUrl: './budgets-transactions.component.html',
  styleUrl: './budgets-transactions.component.css'
})
export class BudgetsTransactionsComponent {

}
