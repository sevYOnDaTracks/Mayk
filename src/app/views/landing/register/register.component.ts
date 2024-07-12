import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
      private fb: FormBuilder,
      private authService: AuthenticationService,
      private router: Router,
      private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      degreeLevel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      const { email, password, firstName, lastName, phone, birthDate, degreeLevel } = this.registerForm.value;
      const parsedBirthDate = new Date(birthDate); // Convert string to Date
      this.authService.registerWithEmail(email, password).then(userCredential => {
        const userId = userCredential.user?.uid;
        if (userId) {
          const newUser: User = {
            uid: userId,
            firstName,
            lastName,
            phone,
            birthDate: parsedBirthDate,
            degreeLevel,
            email
          };
          return this.authService.saveUserData(newUser);
        }
      }).then(() => {
        this.snackBar.open('Inscription réussie', 'ok');
        this.router.navigate(['/']);
      }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.snackBar.open('L\'adresse e-mail est déjà utilisée', 'ok');
        } else {
          this.snackBar.open('Inscription échouée', 'ok');
        }
        console.error('Registration failed', error);
      }).finally(() => {
        this.loading = false;
      });
    } else {
      this.snackBar.open('Veuillez renseigner tous les champs !', 'ok');
    }
  }
}
