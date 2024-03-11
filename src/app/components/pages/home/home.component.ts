import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const loginForm = this.el.nativeElement.querySelector('#loginForm') as HTMLFormElement;

    loginForm.addEventListener('submit', (event) => {
      const emailInput = loginForm.elements['email'] as HTMLInputElement;
      if (!this.validateEmail(emailInput.value)) {
        alert('Veuillez entrer une adresse email valide pour le nom d\'utilisateur.');
        event.preventDefault(); // Empêche l'envoi du formulaire si la validation échoue
      }
    });
  }

  private validateEmail(email: string): boolean {
    // Expression régulière pour valider une adresse email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
