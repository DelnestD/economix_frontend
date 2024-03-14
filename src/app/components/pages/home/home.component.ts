import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterOutlet],
})
export class HomeComponent implements OnInit {
  focusConnexion = false;

  constructor() {}

  ngOnInit(): void {}
}
