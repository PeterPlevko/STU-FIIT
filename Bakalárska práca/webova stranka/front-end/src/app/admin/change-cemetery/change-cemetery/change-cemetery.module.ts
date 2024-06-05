import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { PartialsModule } from 'src/app/partials/partials.module';
import { ChangeCemeteryComponent } from './change-cemetery.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';



@NgModule({
  declarations: [
    ChangeCemeteryComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    PartialsModule,
    FormsModule,
  ],
  providers: [
    DataService
],
  exports: [
    ChangeCemeteryComponent
  ],
  bootstrap: [ChangeCemeteryComponent],
})
export class ChangeCemeteryModule { }
