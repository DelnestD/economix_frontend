import { Component } from '@angular/core';
import { Role, User, UserService } from '../../../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-user-list-update',
  standalone: true,
  imports: [],
  templateUrl: './group-user-list-update.component.html',
  styleUrl: './group-user-list-update.component.css',
})
export class GroupUserListUpdateComponent {
  groupUserList: User[] = [];
  hideAloneMessage: boolean = false;

  declare actualUser: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.userService.getUserById(this.getActualIdUser()).subscribe((user) => {
      this.actualUser = user;
      this.userService.getUsersByGroupId(user.group?.id!).subscribe((users) => {
        this.groupUserList = users;
        this.groupUserList = this.groupUserList.filter(
          (user) => user.id !== this.actualUser.id
        );
        if (users.length > 0) {
          this.hideAloneMessage = true;
        }
      });
    });
  }

  updateUserRole(user: User) {
    let message: string = `Voulez-vous vraiment donner le rôle de <span class="font-bold">${this.getOppositeRole(
      user.role!
    )}</span> à <span class="font-bold">${user.lastName} ${
      user.firstName
    }</span> ?`;
    if (this.getOppositeRole(user.role!) === Role.LEADER) {
      message += `<br><p class="text-sm mt-4"><span class="font-bold">Attention</span> : L'utilisateur aura les droits de gestion du groupe.</p>`;
    } else {
      message += `<br><p class="text-sm"><span class="font-bold">Attention</span> : L'utilisateur perdra ses droits de gestion du groupe.</p>`;
    }
    Swal.fire({
      title: 'Confirmation',
      html: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      confirmButtonColor: '#28A745',
      reverseButtons: true,
      cancelButtonText: 'Non',
      cancelButtonColor: '#DC3545',
    }).then((result) => {
      if (result.isConfirmed) {
        user.role = this.getOppositeRole(user.role!);
        this.userService.updateUser(user).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'User role updated',
            showConfirmButton: false,
            timer: 2000,
          });
          this.router.navigate(['/parameters/group']);
        });
      }
    });
  }

  getOppositeRole(role: Role): Role {
    if (role === Role.LEADER) {
      return Role.MEMBER;
    } else {
      return Role.LEADER;
    }
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
