import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/components/navbar/navbar.component';
import { FooterComponent } from './components/components/footer/footer.component';
import { AProposComponent } from './components/pages/a-propos/a-propos.component';
import { ParametresComponent } from './components/pages/parametres/parametres.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    FooterComponent,
    AProposComponent,
    ParametresComponent,
  ],
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
        console.log(val.url);
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
