import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ParametersUserComponent } from './components/pages/parameters-user/parameters-user.component';
import { ParametersGroupComponent } from './components/pages/parameters-group/parameters-group.component';
import { ParametersGroupCreateComponent } from './components/pages/parameters-group-create/parameters-group-create.component';
import { BudgetPageComponent } from './components/pages/budget-page/budget-page.component';

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
    path: 'budget',
    component: BudgetPageComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'parameters',
    children: [
      { path: 'user', component: ParametersUserComponent },
      { path: 'group', component: ParametersGroupComponent },
      { path: 'createGroup', component: ParametersGroupCreateComponent },
    ],
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
