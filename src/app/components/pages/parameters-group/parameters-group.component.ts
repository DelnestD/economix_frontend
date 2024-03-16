import { Component } from '@angular/core';
import { GroupCreateComponent } from '../../components/group-create/group-create.component';
import { GroupUpdateComponent } from '../../components/group-update/group-update.component';
import { UserRoleUpdateComponent } from '../../components/user-role-update/user-role-update.component';

@Component({
  selector: 'app-parameters-group',
  standalone: true,
  imports: [
    GroupCreateComponent,
    GroupUpdateComponent,
    UserRoleUpdateComponent,
  ],
  templateUrl: './parameters-group.component.html',
  styleUrl: '../../../../styles.css',
})
export class ParametersGroupComponent {}
