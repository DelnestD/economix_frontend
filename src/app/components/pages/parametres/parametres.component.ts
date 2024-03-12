import { Component } from '@angular/core';
import { MotDePasseComponent } from './mot-de-passe/mot-de-passe.component';
import { CreationGroupeComponent } from './creation-groupe/creation-groupe.component';
import { MembresListeComponent } from './membres-liste/membres-liste.component';
import { ModificationGroupeComponent } from './modification-groupe/modification-groupe.component';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [MotDePasseComponent,CreationGroupeComponent,MembresListeComponent,ModificationGroupeComponent],
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.css'
})
export class ParametresComponent {

}
