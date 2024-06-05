import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { PartialsModule } from '../partials/partials.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ChangeUserComponent } from './change-user/change-user.component';
import { AddDialogComponent } from './change-user/dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './change-user/dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './change-user/dialogs/edit/edit.dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DataService } from './change-user/services/data.service';
import { ChangeCemeteryModule } from './change-cemetery/change-cemetery/change-cemetery.module';
import { ChangeSoldierModule } from './changeSoldier/change-soldier/change-soldier.module';
import { ChangeBattleModule } from './change-battle/change-battle/change-battle.module';
import { ChangeWarCampModule } from './change-war-camp/change-war-camp.module';
import { ChangeMemorialModule } from './change-memorial/change-memorial.module';
import { AdminRoutingModule } from './admin-routing.module';




// code taken from https://github.com/marinantonio/angular-mat-table-crud
@NgModule({
  declarations: [
    AdminComponent,
    ChangeUserComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
  ],
  imports: [
    PartialsModule,
    AdminRoutingModule,
    CommonModule,
    CommonModule,
    PartialsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    CommonModule,
    RouterModule,
    PartialsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatDividerModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ChangeCemeteryModule,
    ChangeSoldierModule,
    ChangeBattleModule,
    ChangeWarCampModule,
    ChangeMemorialModule,

  ],
  providers: [
    DataService
],
  bootstrap: [ChangeUserComponent],
})
export class AdminModule { }
