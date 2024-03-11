import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction',
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  dateTransaction: Date = new Date();
  description: string = "Description de la transaction/du budget.";
  amount: number = 0;

}
