import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budget-structure',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './budget-structure.component.html',
  styleUrl: './budget-structure.component.css',
})
export class BudgetStructureComponent {
  @Input() declare type: string;
  @Input() declare id: string;
  @Input() declare description: string;
  @Input() declare total: number;

  @Output() modal: EventEmitter<any> = new EventEmitter();

  showModal() {
    this.modal.emit({ type: this.type, id: this.id });
  }
}
