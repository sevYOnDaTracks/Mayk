import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { sidenavOptions, SidenavOption } from '../components/data/nav.data';
import { AuthenticationService } from '../../landing/services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../landing/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  fillerNav: SidenavOption[] = sidenavOptions;
  isSidenavOpened: boolean;
  user$: Observable<User | null>;
  user: User | null;

  private _mobileQueryListener: () => void;

  constructor(
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      private authenticationService: AuthenticationService,
      private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this.isSidenavOpened = !this.mobileQuery.matches;
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      this.isSidenavOpened = !this.mobileQuery.matches;
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.user$ = this.authenticationService.authenticatedUser$;
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  trackByFn(index: number, item: SidenavOption): number {
    return index;
  }

  signOut(): void {
    this.authenticationService.logout().then(() => {
      this.router.navigate(['/']);
    }).catch(error => {
      console.error('Erreur de déconnexion', error);
    });
  }
}
