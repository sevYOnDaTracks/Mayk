import {Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatStepperIntl} from '@angular/material/stepper';
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.scss'
})
export class AdmissionComponent {
  optionalLabelText: string;
  optionalLabelTextChoices: string[] = ['Option 1', 'Option 2', 'Option 3'];
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
      private _formBuilder: FormBuilder,
      private _matStepperIntl: MatStepperIntl,
  ) {}

  updateOptionalLabel() {
    this._matStepperIntl.optionalLabel = this.optionalLabelText;
    // Required for the optional label text to be updated
    // Notifies the MatStepperIntl service that a change has been made
    this._matStepperIntl.changes.next();
  }
}
