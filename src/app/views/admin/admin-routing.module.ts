import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserInfoComponent} from './components/user-info/user-info.component';
import {HomeContentComponent} from './components/home-content/home-content.component';
import {HebergementComponent} from './components/hebergement/hebergement.component';
import {FinanceComponent} from './components/finance/finance.component';
import {AdmissionComponent} from './components/admission/admission.component';
import {ParcoursComponent} from './components/parcours/parcours.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeContentComponent },
      { path: 'user', component: UserInfoComponent },
      { path: 'hebergement', component: HebergementComponent },
      { path: 'finance', component: FinanceComponent },
      { path: 'admission', component: AdmissionComponent },
      { path: 'parcours', component: ParcoursComponent },
      // Ajoutez d'autres routes enfants ici
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
