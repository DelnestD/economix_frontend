import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../services/user.service';
import { Budget, BudgetService } from '../../../../services/budget.service';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-form-budget',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-budget.component.html',
  styleUrl: './form-budget.component.css',
})
export class FormBudgetComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();

  @Input() declare createNew: boolean;
  @Input() declare budgetToUpdate: Budget | undefined;

  constructor(
    private userService: UserService,
    private budgetService: BudgetService,
    private cookieService: CookieService
  ) {}

  formValid: boolean = true;

  budgetForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  getTitle() {
    return this.budgetForm.get('title') as FormControl;
  }

  ngOnInit() {
    if (!this.createNew) {
      this.budgetForm.setValue({
        title: this.budgetToUpdate!.title,
        description: this.budgetToUpdate!.description,
      });
    }
  }

  onSubmit() {
    if (this.getTitle().status === 'INVALID') {
      this.formValid = false;
    } else {
      if (this.createNew) {
        this.budgetService
          .insertBudget(this.budgetForm.value)
          .subscribe((budget) => {
            const userId = this.getActualIdUser();
            this.userService.getUserById(userId).subscribe((user) => {
              console.log('tada');
              user.budgets!.push(budget);
              this.userService
                .updateUser(userId, user)
                .subscribe(() => window.location.reload());
            });
          });
      } else {
        const updatedBudget: Budget = {
          id: this.budgetToUpdate!.id,
          title: this.budgetForm.value.title,
          description: this.budgetForm.value.description,
        };
      this.budgetService
        .updateBudget(updatedBudget)
        .subscribe(() => window.location.reload());
      }
    }
  }

  closeModal() {
    this.close.emit();
  }

  getActualIdUser() {
    return this.getDecodedAccessToken(this.cookieService.get('accessToken')).id;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
