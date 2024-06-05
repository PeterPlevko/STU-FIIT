import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../partials/partials.module';
import { RouterModule } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PartialsModule,
    RouterModule,
    FlexLayoutModule,
  ],
  exports: [LoginPageComponent],
})
export class LoginModule {}
