import { Component } from '@angular/core';
import { GroupCreateComponent } from '../../components/group-create/group-create.component';
import { GroupUpdateComponent } from '../../components/group-update/group-update.component';
import { GroupUserListUpdateComponent } from '../../components/group-user-list-update/group-user-list-update.component';

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
