import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isConnected: boolean = false;
  isRegistered: boolean = true;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    //set here to check if user is connected
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
  }

  checkExpiration(dateToCheck: Date) {
    const dateNow = new Date();
    if (dateNow > dateToCheck) {
      return true;
    }
    return false;
  }
  switchConnection() {
    this.isRegistered = !this.isRegistered;
  }
}
