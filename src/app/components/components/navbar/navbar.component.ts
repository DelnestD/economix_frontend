import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
  showDropDown: boolean = false;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    //? cookie is deleted automaticaly 3 min after expiration
    if (this.cookieService.check('accessToken')) {
      this.isConnected = true;
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
}
