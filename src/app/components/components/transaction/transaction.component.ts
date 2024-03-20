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
  @Input() declare title: string;
  @Input() declare amount: number;
  @Input() declare isRefill: boolean;
  @Input() declare type: string;
  @Input() declare isActualUserPage: boolean;

  @Output() modal: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    if (this.isRefill && this.type === 'budget') {
      this.amount *= -1;
    }
  }

  showModal() {
    this.modal.emit({ type: 'transaction', id: this.id });
  }
}
