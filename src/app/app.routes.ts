// app-routes.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './components/pages/home/connexion/connexion.component';
import { SubscribeComponent } from './components/pages/home/subscribe/subscribe.component';

export const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: '', component: ConnexionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
