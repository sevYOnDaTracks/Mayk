import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingV10Component } from './landing-v10/landing-v10.component';

const routes: Routes = [
  {
    path: '',
    component: LandingV10Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
