import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
      public auth: AuthenticationService,
      private router: Router,
      private fb: FormBuilder,
      private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ]
    });
  }

  loginWithEmail() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.auth.loginWithEmail(email, password).then(() => {
        this.snackBar.open('Connection reussite' , 'ok');
        this.router.navigate(['/']);
      }).catch(error => {
        this.snackBar.open('Login failed');
        console.error('Login failed', error);
      });
    }else{
      this.snackBar.open('Veuillez renseigner tout les champs !');
    }
  }
}
