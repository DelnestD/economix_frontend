import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../../../../services/shared.service';
import { jwtDecode } from 'jwt-decode';
import { Role, User, UserService } from '../../../../services/user.service';
import { Group } from '../../../../services/group.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isConnected: boolean = false;
  isRegistered: boolean = true;
  showDropDown: boolean = false;
  isLeader: boolean = false;
  haveGroup: boolean = true;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    //? cookie is deleted automaticaly 3 min after expiration
    if (this.cookieService.check('accessToken')) {
      this.isConnected = true;
      this.userService
        .getUserById(this.getActualIdUser())
        .subscribe((user: User) => {
          if (user.role === Role.LEADER) {
            this.isLeader = true;
          } else if (user.role === null) {
            this.haveGroup = false;
          }
        });
    } else {
      this.isConnected = false;
      this.isRegistered = true;
      this.router.navigate(['/home']);
    }
    this.sharedService.changeRegisterStatus(this.isRegistered);
  }

  switchConnection() {
    this.isRegistered = !this.isRegistered;
    this.sharedService.changeRegisterStatus(this.isRegistered);
  }

  setShowDropDown(value: boolean) {
    this.showDropDown = value;
  }

  deconnect() {
    this.cookieService.delete('accessToken');
    this.isConnected = false;
    this.isRegistered = true;
    this.router.navigate(['/home']);
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
