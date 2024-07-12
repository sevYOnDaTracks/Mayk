import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './components/footer/footer.component';
import {
  NguCarousel,
  NguCarouselDefDirective,
  NguCarouselNextDirective,
  NguCarouselPrevDirective,
  NguItemComponent,
  NguTileComponent
} from '@ngu/carousel';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UserInfoComponent} from './components/user-info/user-info.component';


@NgModule({
  declarations: [HeaderComponent , HomeComponent , FooterComponent , UserInfoComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NguCarousel,
    NguTileComponent,
    NguCarousel,
    NguCarouselDefDirective,
    NguCarouselNextDirective,
    NguCarouselPrevDirective,
    NguItemComponent,
    NgbModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbar,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class AdminModule { }
