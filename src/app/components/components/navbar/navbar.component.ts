import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  constructor() {}

  ngOnInit() {
    //set here to check if user is connected
  }

  switchConnection() {
    this.isRegistered = !this.isRegistered;
  }
}
