import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  @Input() declare id: string;
  @Input() declare dateTransaction: Date;
  @Input() declare description: string;
  @Input() declare amount: number;
}
