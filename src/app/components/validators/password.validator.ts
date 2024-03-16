import { AbstractControl, ValidationErrors } from '@angular/forms';

export function confirmPassword(
  control: AbstractControl
): ValidationErrors | null {
  const passwordValue = control.get('password')?.value;
  const passwordConfirmValue = control.get('passwordConfirmation')?.value;

  if (passwordValue !== passwordConfirmValue) {
    return { confirmPassword: true };
  }

  return null;
}
