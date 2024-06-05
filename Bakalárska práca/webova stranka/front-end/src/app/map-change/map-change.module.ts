import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapChangeComponent } from './map-change/map-change.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  declarations: [MapChangeComponent],
  imports: [
    PartialsModule,
    RouterModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MapChangeModule {}
