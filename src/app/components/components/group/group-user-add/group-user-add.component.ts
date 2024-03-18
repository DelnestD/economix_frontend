import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Role, UserService } from '../../../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Group } from '../../../../services/group.service';

@Component({
  selector: 'app-group-user-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './group-user-add.component.html',
  styleUrl: '../../../../../styles.css',
})
export class GroupUserAddComponent {
  userAddForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  showErrorMessage: boolean = false;

  declare actualGroup: Group;

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {
    userService.getUserById(this.getActualIdUser()).subscribe((user) => {
      this.actualGroup = user.group!;
    });
  }

  get EmailControl() {
    return this.userAddForm.get('email') as FormControl;
  }

  onSubmit() {
    //! error on email not found
    this.userService
      .getUserByEmail(this.userAddForm.value.email!)
      .subscribe((user) => {
        if (user.group) {
          this.showErrorMessage = true;
          console.error('user already in a group');
        } else {
          user.role = Role.MEMBER;
          user.group = this.actualGroup;
          this.userService.updateUser(user).subscribe((user) => {
            console.log('user added successfully');
          });
        }
      });
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
