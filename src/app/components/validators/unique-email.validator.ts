import { AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';

export async function uniqueEmailValidator(
  control: AbstractControl,
  userService: UserService
): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = control.value;
      //TODO: call the user service to check if the email is unique
      if (userService.getUserByEmail(email) !== null) {
        resolve({ uniqueEmail: true });
      }
      resolve(null);
    }, 1000);
  });
}
