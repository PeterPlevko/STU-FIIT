import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { ChangeBattleComponent } from './change-battle.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { PartialsModule } from 'src/app/partials/partials.module';
import { DataService } from './services/data.service';



@NgModule({
  declarations: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ChangeBattleComponent
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
    ChangeBattleComponent
  ],
  bootstrap: [ChangeBattleComponent],
})
export class ChangeBattleModule { }
