import { Component, OnInit } from '@angular/core';
import { ConnexionComponent } from "../../forms/connexion/connexion.component";
import { SubscribeComponent } from "../../forms/subscribe/subscribe.component";
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [ConnexionComponent, SubscribeComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
}
}
