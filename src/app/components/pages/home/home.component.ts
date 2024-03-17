import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { LoginComponent } from '../../components/auth/login/login.component';
import { RegisterComponent } from '../../components/auth/register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: '../../../../styles.css',
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
