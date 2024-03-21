import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BudgetService } from '../../../services/budget.service';
import Swal from 'sweetalert2';

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
  @Input() declare title: string;
  @Input() declare total: number;
  @Input() declare realTotal?: number;
  @Input() declare isActualUserPage: boolean;

  @Output() modal: EventEmitter<any> = new EventEmitter();

  constructor(private budgetService: BudgetService) {}

  showModal() {
    this.modal.emit({ type: this.type, id: this.id });
  }

  deleteBudget() {
    Swal.fire({
      title: `Etes vous sûr de vouloir supprimer ${this.title} ?`,
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      confirmButtonColor: '#28A745',
      reverseButtons: true,
      cancelButtonText: 'Annuler',
      cancelButtonColor: '#DC3545',
    }).then((result) => {
      if (result.isConfirmed) {
        this.budgetService.deleteBudget(this.id).subscribe(() => {
          Swal.fire({
            title: 'Supprimé !',
            text: `${this.title} a été supprimé.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }
}
