import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../landing/model/user';
import { AuthenticationService } from '../../../landing/services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { niveauEtude } from '../data/niveauEtude.data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user$: Observable<User | null>;
  userForm: FormGroup;
  isEditing = false;
  niveauxEtude = niveauEtude;
  selectedFiles: { [key: string]: File | null } = {
    photoUrl: null,
    cni: null,
    passport: null,
    identityPhoto: null
  };

  constructor(
      private auth: AuthenticationService,
      private fb: FormBuilder,
      private _snackBar: MatSnackBar,
      private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      birthDate: [{ value: '', disabled: true }],
      degreeLevel: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      photoUrl: [{ value: '', disabled: true }],
      cniUrl: [{ value: '', disabled: true }],
      passportUrl: [{ value: '', disabled: true }],
      identityPhotoUrl: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.user$ = this.auth.authenticatedUser$;
    this.user$.subscribe(user => {
      if (user) {
        console.log(user);
        this.userForm.patchValue(user);
      }
    });
  }

  editUser(): void {
    this.isEditing = true;
    this.userForm.enable();
    this.userForm.get('email')?.disable(); // Disable email if you don't want it to be edited
  }

  saveUser(): void {
    if (this.userForm.valid) {
      this.auth.getCurrentUser().then(currentUser => {
        if (currentUser) {
          const updatedUser: User = { ...this.userForm.value, uid: currentUser.uid };
            this.saveUserData(updatedUser);
        }
      });
    }
  }

  saveUserData(user: User): void {
    this.auth.saveUserData(user).then(() => {
      this._snackBar.open('Informations mise à jour', 'ok');
      this.isEditing = false;
      this.userForm.disable();
      this.userForm.get('email')?.disable(); // Assurez-vous que l'e-mail reste désactivé
    }).catch(error => {
      console.error('Error updating user data: ', error);
    });
  }

  signOut(): void {
    this.auth.logout().then(() => {
      // Rediriger vers la page de connexion ou autre
      this.router.navigate(['/']);
    }).catch(error => {
      console.error('Erreur de déconnexion', error);
    });
  }

  async uploadDocument(event: any, documentType: string): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const currentUser = await this.auth.getCurrentUser();
      if (currentUser) {
        const documentUrl = await this.auth.uploadDocument(file, currentUser.uid, documentType);
        await this.auth.updateUserDocument(currentUser.uid, documentType, documentUrl);
        this._snackBar.open(`${documentType} mis à jour`, 'ok');
        this.selectedFiles[documentType] = null;
        this.userForm.get(`${documentType}Url`)?.setValue(documentUrl);
      }
    }
  }

  async deleteDocument(documentType: string): Promise<void> {
    const currentUser = await this.auth.getCurrentUser();
    if (currentUser) {
      await this.auth.deleteDocument(currentUser.uid, documentType);
      await this.auth.updateUserDocument(currentUser.uid, documentType, '');
      this._snackBar.open(`${documentType} supprimé`, 'ok');
      this.userForm.get(`${documentType}Url`)?.setValue('');
    }
  }

  viewDocument(url: string): void {
    window.open(url, '_blank');
  }
}
