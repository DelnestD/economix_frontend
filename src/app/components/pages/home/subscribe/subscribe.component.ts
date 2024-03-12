import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})

export class SubscribeComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  
  @ViewChild('passwordConfirmation', { static: true }) passwordConfirmation!: ElementRef;


  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const loginForm = this.el.nativeElement.querySelector('#loginForm') as HTMLFormElement;

    loginForm.addEventListener('submit', (event) => {
      const emailInput = loginForm.elements.namedItem('email') as HTMLInputElement;
      const passwordInput = loginForm.elements.namedItem('password') as HTMLInputElement;
      const passwordConfirmationInput = this.passwordConfirmation.nativeElement as HTMLInputElement;

      if (!this.validateEmail(emailInput.value)) {
        event.preventDefault();
        // Gérer le cas où l'e-mail n'est pas valide
      } else if (passwordInput.value !== passwordConfirmationInput.value) {
        event.preventDefault();
        // Gérer le cas où les mots de passe ne correspondent pas
      } else {
        // Les deux mots de passe sont valides, vous pouvez procéder à l'inscription
        // Ajoutez ici la logique pour traiter l'inscription
      }
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
