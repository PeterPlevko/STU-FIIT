import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    private readonly formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  formControl = this.formBuilder.group({
    file: ['', [Validators.required]],
    GPS: [''],
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
    checkBox: [''],
  });

  fileShowFlag = true;
  checked = false;
  fileFlag: boolean = true;

  fileName = '';
  file!: File;

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {

    this.data.checked = this.checked;
    this.data.file = this.file
    this.dataService.updateIssue(this.data);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];


    if (this.file) {
      this.fileName = this.file.name;
      this.fileFlag = false;
    }
  }

  setAll(event: any){

    if(this.checked === true){
      this.formControl.get('file')!.clearValidators();
      this.formControl.get('file')!.updateValueAndValidity();
      this.fileFlag = false;
      this.fileShowFlag = false;

    }
    else{
      this.fileFlag = true;
      this.fileShowFlag = true;
      this.formControl.get('file')!.setValidators([Validators.required]);
      this.formControl.get('file')!.updateValueAndValidity();
    }
  }
}
