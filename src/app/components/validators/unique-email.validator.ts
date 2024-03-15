import { AbstractControl, ValidationErrors } from '@angular/forms';

export async function uniqueEmailValidator(
  control: AbstractControl
): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = control.value;
      //TODO: call the user service to check if the email is unique
      if (email === 'monemail@gmail.com') {
        resolve({ uniqueEmail: true });
      }
      resolve(null);
    }, 1000);
  });
}
