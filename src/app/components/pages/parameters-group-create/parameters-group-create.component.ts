import { Component } from '@angular/core';
import { GroupCreateComponent } from '../../components/group/group-create/group-create.component';

@Component({
  selector: 'app-parameters-group-create',
  standalone: true,
  imports: [GroupCreateComponent],
  templateUrl: './parameters-group-create.component.html',
  styleUrl: '../../../../styles.css',
})
export class ParametersGroupCreateComponent {}
