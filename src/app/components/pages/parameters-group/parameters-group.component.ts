import { Component } from '@angular/core';
import { GroupUpdateComponent } from '../../components/group/group-update/group-update.component';
import { GroupUserListUpdateComponent } from '../../components/group/group-user-list-update/group-user-list-update.component';
import { GroupUserAddComponent } from '../../components/group/group-user-add/group-user-add.component';

@Component({
  selector: 'app-parameters-group',
  standalone: true,
  imports: [
    GroupUserAddComponent,
    GroupUpdateComponent,
    GroupUserListUpdateComponent,
  ],
  templateUrl: './parameters-group.component.html',
  styleUrl: '../../../../styles.css',
})
export class ParametersGroupComponent {}
