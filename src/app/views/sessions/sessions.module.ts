import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotComponent } from './forgot/forgot.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    SessionsRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgbDropdownModule,
  ],
  declarations: [SignupComponent, SigninComponent, ForgotComponent]
})
export class SessionsModule { }
