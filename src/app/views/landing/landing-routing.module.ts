import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingV10Component } from './landing-v10/landing-v10.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LandingV10Component
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
