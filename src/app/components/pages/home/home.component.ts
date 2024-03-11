import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const loginForm = this.el.nativeElement.querySelector('#loginForm') as HTMLFormElement;

    loginForm.addEventListener('submit', (event) => {
      const emailInput = (loginForm.elements.namedItem('email') as HTMLInputElement);
      if (!this.validateEmail(emailInput.value)) {
        event.preventDefault();
      }
    });
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
