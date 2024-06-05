import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeMemorialComponent } from './change-memorial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { PartialsModule } from 'src/app/partials/partials.module';
import { DataService } from './services/data.service';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { ShowImageDialogComponent } from './dialogs/showImage/showImage.dialog.component';



@NgModule({
  declarations: [
    ChangeMemorialComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    ShowImageDialogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    PartialsModule,
    FormsModule,
  ],
  providers: [
    DataService
  ],
  exports: [
    ChangeMemorialComponent
  ],
  bootstrap: [ChangeMemorialComponent],
})

export class ChangeMemorialModule { }
