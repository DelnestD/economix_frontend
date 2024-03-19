import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User, UserService } from '../../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Group, GroupService } from '../../../../services/group.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-group-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './group-update.component.html',
  styleUrl: '../../../../../styles.css',
})
export class GroupUpdateComponent {
  updateGroupForm = new FormGroup({
    newName: new FormControl('', [Validators.required]),
  });

  declare actualUser: User;

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    userService.getUserById(this.getActualIdUser()).subscribe((user) => {
      this.actualUser = user;

      this.updateGroupForm.setValue({
        newName: user.group?.name!,
      });
    });
  }

  onSubmit() {
    let updateGroup: Group = {
      id: this.actualUser.group?.id!,
      name: this.updateGroupForm.value.newName!,
    };

    this.groupService.updateGroup(updateGroup).subscribe((group) => {
      console.log('group updated', group);
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
