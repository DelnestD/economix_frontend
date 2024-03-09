import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/components/navbar/navbar.component';
import { FooterComponent } from './components/components/footer/footer.component';
import { AProposComponent } from './components/pages/a-propos/a-propos.component';
import { ContactComponent } from './components/pages/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AProposComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '0';
}
