import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../../../services/shared.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isConnected: boolean = false;
  isRegistered: boolean = true;

  constructor(
    private cookieService: CookieService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    //TODO check when login - register is implemented
    const tokenCookie = this.cookieService.get('accessToken');
    const expirationCookie = new Date(this.cookieService.get('Expires'));

    console.log('tokenCookie', tokenCookie);
    console.log('expirationCookie', expirationCookie);

    if (tokenCookie && !this.checkExpiration(expirationCookie)) {
      this.isConnected = true;
    } else {
      this.isConnected = false;
      this.isRegistered = true;
    }
    this.sharedService.changeRegisterStatus(this.isRegistered);
  }

  checkExpiration(dateToCheck: Date) {
    const dateNow = new Date();
    if (dateNow > dateToCheck) {
      return true;
    }
    return false;
  }

  switchConnection() {
    //TODO add switch of component from login to register and vice versa
    this.isRegistered = !this.isRegistered;
    this.sharedService.changeRegisterStatus(this.isRegistered);
  }
}
