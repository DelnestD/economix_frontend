import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BudgetsTransactionsComponent } from './components/pages/budgets-transactions/budgets-transactions.component';
import { NavbarComponent } from './components/components/navbar/navbar.component';
import { AProposComponent } from './components/pages/a-propos/a-propos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, BudgetsTransactionsComponent, AProposComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '0';
}
