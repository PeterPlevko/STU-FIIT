import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleDialog, MapComponent, MemorialDialog, WarCampDialog } from './map/map.component';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../partials/partials.module';
import { MaterialModule } from '../material/material.module';
import { AddInformationFormComponent } from './add-information-form/add-information-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { CemeteryComponent } from './cemetery/cemetery.component';
import { BattleComponent } from './battle/battle.component';
import { MemorialComponent } from './memorial/memorial.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { WarCampComponent } from './war-camp/war-camp.component';
import { SoldierComponent } from './soldier/soldier.component';
import { DeceasedListComponent } from './deceased-list/deceased-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CemeteryDialog } from './map/map.component';
import { SlovakiaRoutingModule } from './slovakia-map-routing.module';
@NgModule({
  declarations: [
    MapComponent,
    AddInformationFormComponent,
    CemeteryComponent,
    BattleComponent,
    MemorialComponent,
    WarCampComponent,
    SoldierComponent,
    DeceasedListComponent,
    CemeteryDialog,
    BattleDialog,
    WarCampDialog,
    MemorialDialog,
  ],
  imports: [
    SlovakiaRoutingModule,
    JwPaginationModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
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
    LeafletModule,
    NgxPaginationModule,
  ],
  providers:[

  ],

  bootstrap: [DeceasedListComponent]
})
export class SlovakiaMapModule {}
