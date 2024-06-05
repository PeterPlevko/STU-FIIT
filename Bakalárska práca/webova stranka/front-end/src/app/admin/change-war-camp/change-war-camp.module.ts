// table taken from https://github.com/marinantonio/angular-mat-table-crud
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeWarCampComponent } from './change-war-camp.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { PartialsModule } from 'src/app/partials/partials.module';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    ChangeWarCampComponent,
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
    ChangeWarCampComponent
  ],
  bootstrap: [ChangeWarCampComponent],
  })
export class ChangeWarCampModule { }
