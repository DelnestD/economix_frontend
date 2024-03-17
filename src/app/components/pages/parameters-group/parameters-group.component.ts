import { Component } from '@angular/core';
import { GroupCreateComponent } from '../../components/group/group-create/group-create.component';
import { GroupUpdateComponent } from '../../components/group/group-update/group-update.component';
import { GroupUserListUpdateComponent } from '../../components/group/group-user-list-update/group-user-list-update.component';

@Component({
  selector: 'app-parameters-group',
  standalone: true,
  imports: [
    GroupCreateComponent,
    GroupUpdateComponent,
    GroupUserListUpdateComponent,
  ],
  templateUrl: './parameters-group.component.html',
  styleUrl: '../../../../styles.css',
})
export class ParametersGroupComponent {}
