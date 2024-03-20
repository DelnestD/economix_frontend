import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  @Input() declare id: string;
  @Input() declare accountId: string;
  @Input() declare dateTransaction: Date;
  @Input() declare description: string;
  @Input() declare amount: number;

  @Output() modal: EventEmitter<any> = new EventEmitter();

  showModal() {
    this.modal.emit({ type: 'transaction', id: this.id });
  }
}