import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Issue} from '../../models/issue';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    private readonly formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: DataService) { }


  formControl = this.formBuilder.group({
    file: ['', [Validators.required]],
    GPS: ['', [Validators.required]],
    dateOfBirth: [''],
    dateOfDeath: [''],
    deceasedList: [''],
    imagePath: [''],
    location: [''],
    municipalityDescription: [''],
    name: [''],
    photoDescription: [''],
    state: [''],
    addedBy: [''],
  });

  fileFlag: boolean = true;

  fileName = '';
  file!: File;

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // empty stuff
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    public confirmAdd(): void {
      this.data.file = this.file
      this.dataService.addIssue(this.data);
    }

  onFileSelected(event: any) {
    this.file = event.target.files[0];


    if (this.file) {
      this.fileName = this.file.name;
      this.fileFlag = false;
    }
  }
}
