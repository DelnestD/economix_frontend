import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budget-structure',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './budget-structure.component.html',
  styleUrl: './budget-structure.component.css'
})
export class BudgetStructureComponent {
  @Input()
  description!: string;
  @Input()
  total!: number;
}
