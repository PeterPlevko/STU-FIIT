import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WelcomeTextComponent } from './welcome-text/welcome-text.component';

import { PartialsModule } from '../partials/partials.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    WelcomePageComponent,
    WelcomeTextComponent,
  ],
  imports: [
    PartialsModule,
    RouterModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [WelcomePageComponent],
})
export class HomePageModule {}
