import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { User } from '../../../landing/model/user';
import {AuthenticationService} from '../../../landing/services/authentication.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss'
})
export class HomeContentComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.user$ = this.auth.authenticatedUser$;
    this.user$.subscribe(user => {
      if (user) {
        console.log(user);
      }
    });
  }
}
