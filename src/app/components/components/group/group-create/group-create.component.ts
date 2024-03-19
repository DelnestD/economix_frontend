import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Group, GroupService } from '../../../../services/group.service';
import { Role, User, UserService } from '../../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-group-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './group-create.component.html',
  styleUrl: '../../../../../styles.css',
})
export class GroupCreateComponent {
  createGroupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  declare actualUser: User;

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    userService.getUserById(this.getActualIdUser()).subscribe((user) => {
      this.actualUser = user;
    });
  }

  onSubmit() {
    this.createGroup(this.createGroupForm.value.name!);
  }

  addUserAsGroupLeader(group: Group) {
    this.actualUser.role = Role.LEADER;
    this.actualUser.group = group;

    this.userService.updateUser(this.actualUser).subscribe((user) => {
      console.log('user updated', user);
      window.location.href = '/about';
    });
  }

  createGroup(nameGroup: string) {
    let newGroup: Group = {
      name: nameGroup,
    };
    this.groupService.insertGroup(newGroup).subscribe((group) => {
      console.log('group created', group);

      this.addUserAsGroupLeader(group);
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
