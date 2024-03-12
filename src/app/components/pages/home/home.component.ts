import { Component, OnInit } from '@angular/core';
import { ConnexionComponent } from './connexion/connexion.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ConnexionComponent, SubscribeComponent],
})
export class HomeComponent implements OnInit {
  focusConnexion = false;

  constructor() {}

  ngOnInit(): void {}
}
