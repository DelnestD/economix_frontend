import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AProposComponent } from './components/pages/a-propos/a-propos.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ParametresComponent } from './components/pages/parametres/parametres.component';
import { ConnexionComponent } from './components/pages/home/connexion/connexion.component';
import { SubscribeComponent } from './components/pages/home/subscribe/subscribe.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'a-propos',
    component: AProposComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'parametres',
    component: ParametresComponent,
  },
  { 
    path: 'connexion', 
    component: ConnexionComponent 
  },
  { 
    path: 'subscribe', 
    component: SubscribeComponent },
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
