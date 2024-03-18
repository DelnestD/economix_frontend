import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account, AccountService } from '../../../../services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-form-new-budget',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-new-budget.component.html',
  styleUrl: './form-new-budget.component.css'
})
export class FormNewBudgetComponent implements OnInit{
  accounts: Account[] = [];

  constructor(
    private userService: UserService
  ) {}

  createBudgetForm = new FormGroup(
    {
      compte: new FormControl('')
    },
    [Validators.required]
  );

  ngOnInit() {
      
  }
  
}
