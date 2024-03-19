import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountService, Account } from '../../../../services/account.service';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Group } from '../../../../services/group.service';

@Component({
  selector: 'app-form-account',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-account.component.html',
  styleUrl: './form-account.component.css',
})
export class FormAccountComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();

  @Input() declare createNew: boolean;
  @Input() declare accountToUpdate: Account | undefined;
  @Input() declare group: Group | undefined;

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private accountService: AccountService
  ) {}

  accountForm: FormGroup = new FormGroup(
    {
      title: new FormControl(''),
      description: new FormControl(''),
    },
  );

  ngOnInit() {
    if (!this.createNew) {
      this.accountForm.setValue({
        title: this.accountToUpdate!.title,
        description: this.accountToUpdate!.description,
      });
    }
  }

  onSubmit() {
    if (this.createNew) {
      this.accountService
        .insertAccount(this.accountForm.value)
        .subscribe((account) => {
          const userId = this.getActualIdUser();
          this.userService.getUserById(userId).subscribe((user) => {
            user.accounts!.push(account);
            this.userService
              .updateUser(userId, user)
              .subscribe((user) => console.log('user', user));
          });
        });
    } else {
      //! Update account error
      const updateAccount: Account = {
        id: this.accountToUpdate!.id,
        title: this.accountForm.value.title,
        description: this.accountForm.value.description,
      };
      console.log('avant service', updateAccount);
      this.accountService.updateAccount(updateAccount).subscribe((account) => {
        console.log('account updated', account);
      });
    }

    window.location.reload();
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
