import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AProposComponent } from './components/pages/a-propos/a-propos.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { BudgetPageComponent } from './components/pages/budget-page/budget-page.component';

export const routes: Routes = [{
    path: 'a-propos',
    component: AProposComponent
}, {
    path: 'contact',
    component: ContactComponent
}, {
    path: 'budget',
    component: BudgetPageComponent
}];

