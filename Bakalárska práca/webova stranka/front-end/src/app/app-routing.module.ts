import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/components/login-page/login-page.component';
import { WelcomePageComponent } from './home-page/welcome-page/welcome-page.component';
import { HistoryPageComponent } from './history/history-page/history-page.component';
import { ContactPageComponent } from './contact/contact-page/contact-page.component';
import { MapChangeComponent } from './map-change/map-change/map-change.component';
import { MapComponent } from './slovakia-map/map/map.component';
import { RegisterPageComponent } from './login/components/register-page/register-page.component';
import { ConfirmInformationComponent } from './confirm-information/confirm-information/confirm-information.component';
import { AdminGuard } from './admin/admin.guard';
import { HistorianGuardGuard } from './confirm-information/historian-guard.guard';
import { UserGuard } from './slovakia-map/user.guard';
import { DeceasedListComponent } from './slovakia-map/deceased-list/deceased-list.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'homepage',
    component: WelcomePageComponent,
  },
  {
    path: 'history',
    component: HistoryPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  {
    path: 'mapchange',
    component: MapChangeComponent,
  },
  {
    path: 'slovakia',
    component: MapComponent,
  },

  {
    path: 'addinformation',
    canActivate: [UserGuard],
    loadChildren:() => import('./slovakia-map/slovakia-map.module').then(m => m.SlovakiaMapModule),
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'confirminformation',
    canActivate: [HistorianGuardGuard],
    component: ConfirmInformationComponent,
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'deceasedList',
    component: DeceasedListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
