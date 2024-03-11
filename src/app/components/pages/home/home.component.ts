import { Component, OnInit, ElementRef } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    
    const loginForm = this.el.nativeElement.querySelector('#loginForm') as HTMLFormElement;

    loginForm.addEventListener('submit', (event) => {
      const emailInput = (loginForm.elements.namedItem('email') as HTMLInputElement);
      if (!this.validateEmail(emailInput.value)) {
        event.preventDefault();
        // post => localhost:8081/auth/login
        // post => localhost:8081/auth/register
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
