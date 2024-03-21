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
import Swal from 'sweetalert2';

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
        Swal.fire({
          title: 'Confirmation',
          html: `Etes vous sûr de vouloir ajouter <span class="font-bold">${user.lastName} ${user.firstName}</span> à votre foyer ?`,
          icon: 'warning',
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: 'Oui',
          confirmButtonColor: '#28A745',
          cancelButtonText: 'Non',
          cancelButtonColor: '#DC3545',
        }).then((result) => {
          if (result.isConfirmed) {
            if (user.group) {
              Swal.fire({
                title: 'Erreur',
                text: "L'utilisateur est déjà dans un foyer",
                icon: 'error',
                confirmButtonColor: '#28A745',
              });
            } else {
              user.role = Role.MEMBER;
              user.group = this.actualGroup;
              this.userService.updateUser(user).subscribe((user) => {
                Swal.fire({
                  title: 'Succès',
                  text: `${user.lastName} ${user.firstName} a bien été ajouté à votre foyer`,
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  window.location.reload();
                });
              });
            }
          }
        });
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
