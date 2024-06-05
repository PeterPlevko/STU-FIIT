import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ErrorNotificationComponent } from './notifications/error-notification.component';
import { InfoNotificationComponent } from './notifications/info-notification.component';
import { SuccessNotificationComponent } from './notifications/success-notification.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LOCAL_STORAGE_TOKEN } from './localStorage/local-storage.service';
import { MatBadgeModule } from '@angular/material/badge';
import { EditDialogComponent } from './header/dialogs/edit/edit.dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorNotificationComponent,
    InfoNotificationComponent,
    SuccessNotificationComponent,
    EditDialogComponent

  ],
  imports: [
    MatDialogModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    MatBadgeModule,

  ],
  exports: [HeaderComponent, FooterComponent],
  providers: [{ provide: LOCAL_STORAGE_TOKEN, useValue: localStorage }],
})
export class PartialsModule {}
