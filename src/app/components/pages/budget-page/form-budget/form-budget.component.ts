import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Account, AccountService } from '../../../../services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../services/user.service';
import { BudgetService } from '../../../../services/budget.service';

@Component({
  selector: 'app-form-budget',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-budget.component.html',
  styleUrl: './form-budget.component.css',
})
export class FormBudgetComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();

  @Input() createNew: boolean = false;

  constructor(
    private userService: UserService,
    private budgetService: BudgetService
  ) {}

  budgetForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl(''),
  });

  description = new FormControl('');

  onSubmit() {
    let oldValues: { title: string; description: string };
    () => {
      if (this.createNew) {
        oldValues = { title: '', description: '' };
      } else {
        //TODO attribué les valeurs du compte modifié !
        oldValues = { title: '', description: '' };
      }
    };

    // this.budgetService.insertBudget(this.)

    // this.accountService
    //   .insertAccount(this.accountForm.value)
    //   .subscribe((account) => {
    //     const userId = this.getActualIdUser();
    //     const user = this.userService.getUserById(userId).subscribe((user) => {
    //       user.accounts!.push(account);
    //       this.userService.updateUser(userId, user).subscribe();
    //     });
    //   });

    window.location.reload();
  }

  closeModal() {
    this.close.emit();
  }
}
