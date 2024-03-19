import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../../components/register/register.component';
import { SharedService } from '../../../services/shared.service';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  showLogin: boolean = false;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.isRegistered.subscribe((isRegistered) => {
      this.showLogin = isRegistered;
    });
  }
}
