import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { HomePageModule } from './home-page/home-page.module';
import { MaterialModule } from './material/material.module';
import { PartialsModule } from './partials/partials.module';
import { HistoryModule } from './history/history.module';
import { ContactModule } from './contact/contact.module';
import { MapChangeModule } from './map-change/map-change.module';
import { ConfirmInformationModule } from './confirm-information/confirm-information.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [
    ConfirmInformationModule,
    MatFileUploadModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    MaterialModule,
    HomePageModule,
    PartialsModule,
    HistoryModule,
    ContactModule,
    MapChangeModule,
    LeafletModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
