import { Component } from '@angular/core';
import { UserInfosUpdateComponent } from '../../components/user-infos-update/user-infos-update.component';
import { UserPasswordUpdateComponent } from '../../components/user-password-update/user-password-update.component';
import { GroupCreateComponent } from '../../components/group-create/group-create.component';
import { GroupUpdateComponent } from '../../components/group-update/group-update.component';
import { UserRoleUpdateComponent } from '../../components/user-role-update/user-role-update.component';

@Component({
  selector: 'app-parameters',
  standalone: true,
  imports: [
    UserInfosUpdateComponent,
    UserPasswordUpdateComponent,
    GroupCreateComponent,
    GroupUpdateComponent,
    UserRoleUpdateComponent,
  ],
  templateUrl: './parameters.component.html',
  styleUrl: '../../../../styles.css',
})
export class ParametersComponent {}
