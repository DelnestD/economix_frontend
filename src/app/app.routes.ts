import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AProposComponent } from './components/pages/a-propos/a-propos.component';

export const routes: Routes = [{
    path: 'about',
    component: AProposComponent
}];

