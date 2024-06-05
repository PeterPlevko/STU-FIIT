import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './showImage.dialog.html',
  styleUrls: ['./showImage.dialog.css']
})
export class ShowImageDialogComponent {

  constructor(public dialogRef: MatDialogRef<ShowImageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }
}
