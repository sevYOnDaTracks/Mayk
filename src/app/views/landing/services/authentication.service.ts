import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Ajouter ceci pour Firebase Storage
import { map, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<firebase.User | null>;

  constructor(
      private afAuth: AngularFireAuth,
      private firestore: AngularFirestore,
      private storage: AngularFireStorage // Injecter AngularFireStorage
  ) {
    this.user$ = afAuth.authState;
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmail(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  saveUserData(user: User) {
    return this.firestore.collection('users').doc(user.uid).set({ ...user });
  }

  logout() {
    return this.afAuth.signOut();
  }

  getUserData(uid: string): Observable<User | null> {
    return this.firestore.collection('users').doc<User>(uid).valueChanges().pipe(
        switchMap(user => {
          if (user) {
            return this.afAuth.user.pipe(
                map(firebaseUser => {
                  if (firebaseUser) {
                    return {
                      ...user,
                      email: firebaseUser.email || null,
                      birthDate: user.birthDate ? (user.birthDate as any).toDate() : null
                    };
                  }
                  return null;
                })
            );
          }
          return of(null);
        })
    );
  }

  get authenticatedUser$(): Observable<User | null> {
    return this.user$.pipe(
        switchMap(user => {
          if (user) {
            return this.getUserData(user.uid);
          } else {
            return of(null);
          }
        })
    );
  }

  async getCurrentUser(): Promise<User | null> {
    const currentUser = await this.afAuth.currentUser;
    if (currentUser) {
      const userSnapshot = await this.firestore.collection('users').doc<User>(currentUser.uid).get().toPromise();
      const userData = userSnapshot?.data() || null;
      if (userData) {
        return {
          ...userData,
          email: currentUser.email || null,
          birthDate: userData.birthDate ? (userData.birthDate as any).toDate() : null
        };
      }
    }
    return null;
  }

  // Ajouter la méthode pour télécharger la photo
  async uploadPhoto(uid: string, file: File): Promise<string> {
    const filePath = `users/${uid}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    await fileRef.put(file);
    return await fileRef.getDownloadURL().toPromise();
  }
}
