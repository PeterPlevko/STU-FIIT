import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmInformationComponent } from './confirm-information/confirm-information.component';
import { PartialsModule } from '../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CemeteryComponent } from './cemetery/cemetery.component';
import { BattleComponent } from './battle/battle.component';
import { MemorialComponent } from './memorial/memorial.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDividerModule } from '@angular/material/divider';

import { WarCampComponent } from './war-camp/war-camp.component';
import { SoldierComponent } from './soldier/soldier.component';

@NgModule({
  declarations: [
    ConfirmInformationComponent,
    CemeteryComponent,
    BattleComponent,
    MemorialComponent,
    WarCampComponent,
    SoldierComponent,
  ],
  imports: [
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
  ],
})
export class ConfirmInformationModule {}
