import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthenticationService } from '../../landing/services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(
      private firestore: AngularFirestore,
      private storage: AngularFireStorage,
      private auth: AuthenticationService
  ) {}

  // Method to save form data
  async submitAdmissionForm(formData: any): Promise<void> {
    const currentUser = await this.auth.getCurrentUser();
    if (currentUser) {
      const userId = currentUser.uid;
      await this.firestore.collection('admissions').doc(userId).set(formData);
    }
  }

  // Method to upload files
  async uploadDocument(file: File, userId: string, documentType: string): Promise<string> {
    const filePath = `admissions/${userId}/${documentType}`;
    const fileRef = this.storage.ref(filePath);
    await this.storage.upload(filePath, file);
    return fileRef.getDownloadURL().toPromise();
  }
}
