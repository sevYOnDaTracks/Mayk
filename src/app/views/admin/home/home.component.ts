import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { sidenavOptions, SidenavOption } from '../components/data/nav.data';
import {AuthenticationService} from '../../landing/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  fillerNav: SidenavOption[] = sidenavOptions;
  isSidenavOpened: boolean;  // Add this line

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher , private authenticationService: AuthenticationService , private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this.isSidenavOpened = !this.mobileQuery.matches;  // Set initial state based on screen size
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      this.isSidenavOpened = !this.mobileQuery.matches;  // Update state on screen size change
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  trackByFn(index: number, item: SidenavOption): number {
    return index;
  }

  signOut(): void {
    this.authenticationService.logout().then(() => {
      // Rediriger vers la page de connexion ou autre
      this.router.navigate(['/']);
    }).catch(error => {
      console.error('Erreur de déconnexion', error);
    });
  }
}
