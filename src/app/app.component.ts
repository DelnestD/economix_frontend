import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/components/common/footer/footer.component';
import { NavbarComponent } from './components/components/common/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EconomiX';
  show: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (
          val.url === '/not-found' ||
          val.urlAfterRedirects === '/not-found'
        ) {
          this.show = false;
        } else {
          this.show = true;
        }
      }
    });
  }
}
