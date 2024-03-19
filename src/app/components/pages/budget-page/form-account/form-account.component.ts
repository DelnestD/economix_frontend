import { Component, EventEmitter, Input, Output } from '@angular/core';
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

@Component({
  selector: 'app-form-account',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-account.component.html',
  styleUrl: './form-account.component.css',
})
export class FormAccountComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() createNew: boolean = false;

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
    [Validators.required]
  );

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
    this.accountService
      .insertAccount(this.accountForm.value)
      .subscribe((account) => {
        const userId = this.getActualIdUser();
        const user = this.userService.getUserById(userId).subscribe((user) => {
          user.accounts!.push(account);
          this.userService.updateUser(userId, user).subscribe();
        });
      });

    window.location.reload();
  }

  closeModal() {
    this.close.emit();
  }

  ngOnInit() {}

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
