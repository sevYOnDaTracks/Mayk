import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../landing/model/user';
import { AuthenticationService } from '../../../landing/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {
  user$: Observable<User | null>;
  educationForm: FormGroup;
  countries = [
    { value: 'FRANCE', viewValue: 'France' },
    { value: 'CANADA', viewValue: 'Canada' },
  ];
  allAdmissionTypes = {
    FRANCE: [
      { value: 'CAMPUS_FRANCE', viewValue: 'Campus France / Licence Master Doctorat (LMD)' },
      { value: 'PARCOURS_SUP', viewValue: 'Parcours Sup / BTS' },
      { value: 'ECOLE_PRIVEE', viewValue: 'Ecole Privée' }
    ],
    CANADA: [
      { value: 'CEGEP_COLLEGIALE', viewValue: 'CEGEP - Étude Collégiale' },
      { value: 'ETUDE_UNIVERSITAIRE', viewValue: 'Étude Universitaire' }
    ]
  };
  admissionTypes = [];
  fieldsOfStudy = [
    { value: 'SCIENCE', viewValue: 'Science' },
    { value: 'ARTS', viewValue: 'Arts' },
    { value: 'COMMERCE', viewValue: 'Commerce' },
    { value: 'INFORMATIQUE', viewValue: 'Informatique' },
    { value: 'BTP', viewValue: 'BTP - Bâtiments et travaux publics' },
    { value: 'ELECTRICITE', viewValue: 'Électricité' }
  ];
  educationLevels = [
    { value: 'BAC+1', viewValue: 'BAC+1' },
    { value: 'BAC+2', viewValue: 'BAC+2' },
    { value: 'BAC+3', viewValue: 'BAC+3' },
    { value: 'BAC+4', viewValue: 'BAC+4' },
    { value: 'BAC+5', viewValue: 'BAC+5' },
  ];
  selectedCountry: string;
  selectedAdmissionType: string;
  selectedField: string;
  selectedLevel: string;

  // Ajoutez ces propriétés pour stocker les noms de fichiers
  fileNames: { [key: string]: string } = {};
  bacFileName = '';
  campusFranceFileName = '';

  @ViewChild('bacFileInput') bacFileInput: ElementRef;
  @ViewChild('campusFranceFileInput') campusFranceFileInput: ElementRef;

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      country: ['', Validators.required],
      admissionType: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      educationLevel: ['', Validators.required],
      bacAverage: [''],
      termAverage2nd1: [''],
      termAverage2nd2: [''],
      termAverage2nd3: [''],
      termAveragePremiere1: [''],
      termAveragePremiere2: [''],
      termAveragePremiere3: [''],
      termAverageTerminale1: [''],
      termAverageTerminale2: [''],
      termAverageTerminale3: [''],
      averageYear1Sem1: [''],
      averageYear1Sem2: [''],
      commentYear1Sem1: [''],
      commentYear1Sem2: [''],
      averageYear2Sem1: [''],
      averageYear2Sem2: [''],
      commentYear2Sem1: [''],
      commentYear2Sem2: [''],
      averageYear3Sem1: [''],
      averageYear3Sem2: [''],
      commentYear3Sem1: [''],
      commentYear3Sem2: [''],
      averageYear4Sem1: [''],
      averageYear4Sem2: [''],
      commentYear4Sem1: [''],
      commentYear4Sem2: [''],
      averageYear5Sem1: [''],
      averageYear5Sem2: [''],
      commentYear5Sem1: [''],
      commentYear5Sem2: [''],
      comments: [''], // Nouveau champ pour les commentaires
    });

    this.user$ = this.auth.authenticatedUser$;
    this.user$.subscribe(user => {
      if (user) {
        // Votre logique utilisateur ici
      }
    });
  }

  onCountryChange(value: string): void {
    this.selectedCountry = value;
    this.educationForm.get('admissionType').reset();
    this.selectedAdmissionType = null;
    this.selectedField = null;
    this.selectedLevel = null;
    this.educationForm.get('fieldOfStudy').reset();
    this.educationForm.get('educationLevel').reset();
    this.admissionTypes = this.allAdmissionTypes[value];
  }

  onAdmissionTypeChange(value: string): void {
    this.selectedAdmissionType = value;
    this.selectedField = null;
    this.selectedLevel = null;
    this.educationForm.get('fieldOfStudy').reset();
    this.educationForm.get('educationLevel').reset();
  }

  onFieldOfStudyChange(value: string): void {
    this.selectedField = value;
    this.selectedLevel = null;
    this.educationForm.get('educationLevel').reset();
  }

  onEducationLevelChange(value: string): void {
    this.selectedLevel = value;
  }

  getYears(level: string): number[] {
    const year = parseInt(level.replace('BAC+', ''), 10);
    return Array.from({ length: year }, (_, i) => i + 1);
  }

  onFileSelected(event: Event, key: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      const file = input.files[0];
      this.fileNames[key] = file.name;
    }
  }

  onBacFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      const file = input.files[0];
      this.bacFileName = file.name;
    }
  }

  onCampusFranceFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      const file = input.files[0];
      this.campusFranceFileName = file.name;
    }
  }

  submitForm(): void {
    if (this.educationForm.valid) {
      this.snackBar.open('Demande d\'admissions soumise', 'Fermer', {
        duration: 3000,
      });
    }
  }
}
