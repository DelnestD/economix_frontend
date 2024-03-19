import { Component } from '@angular/core';
import { UserInfosUpdateComponent } from '../../components/user/user-infos-update/user-infos-update.component';
import { UserPasswordUpdateComponent } from '../../components/user/user-password-update/user-password-update.component';
@Component({
  selector: 'app-parameters-user',
  standalone: true,
  imports: [UserInfosUpdateComponent, UserPasswordUpdateComponent],
  templateUrl: './parameters-user.component.html',
  styleUrl: '../../../../styles.css',
})
export class ParametersUserComponent {}
