import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AProposComponent } from './components/pages/a-propos/a-propos.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ParametresComponent } from './components/pages/parametres/parametres.component';
import { BudgetPageComponent } from './components/pages/budget-page/budget-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: AProposComponent,
  },
  {
    path: 'about',
    component: AProposComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'parameters',
    component: ParametresComponent,
  }, 
  {
    path: 'budget',
    component: BudgetPageComponent  
  }, 
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
