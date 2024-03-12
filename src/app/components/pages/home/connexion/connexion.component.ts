import { Component, OnInit, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
})
export class ConnexionComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const loginForm = this.el.nativeElement.querySelector(
      '#loginForm'
    ) as HTMLFormElement;

    const changeForm = this.el.nativeElement.querySelector(
      '#changeForm'
    ) as HTMLFormElement;

    loginForm.addEventListener('submit', (event) => {
      const emailInput = loginForm.elements.namedItem(
        'email'
      ) as HTMLInputElement;
      if (!this.validateEmail(emailInput.value)) {
        event.preventDefault();
      }
    });

    changeForm.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("Faut changer 'focusConnexion' dans le home.component.ts ");
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
