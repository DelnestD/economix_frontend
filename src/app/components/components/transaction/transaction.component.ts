import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  @Input()
  dateTransaction!: Date;
  @Input()
  description!: string;
  @Input()
  amount!: number;
}