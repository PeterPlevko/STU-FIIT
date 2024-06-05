import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError, of, Observable } from 'rxjs';
import { AddInformationService } from '../services/add-information.service';
import { cemeteryResponse } from '../types/cemeteryTypes';
import { Inject } from '@angular/core';
import { NavigationStart} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { battleResponse } from '../types/battleTypes';
import { NotificationService } from 'src/app/partials/services/notification.service';
import * as L from 'leaflet';
import { State } from '../../partials/services/app-state/types/appStateTypes';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  battleForm: FormGroup;
  globalMap = {} as any;
  currentGPS: string = '';
  private routeSub:any;  // subscription to route observer
  errorMsg: string | undefined;
  appState$: Observable<State> | undefined; // this is needed to use appstate
  username: string = '';

  constructor(
    private meta: Meta,
    private appStateService: AppStateService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private addInformationService: AddInformationService,
    public router: Router
  ) {
    this.battleForm = this.formBuilder.group({
      GPS: ['', [Validators.required]],
      name: [''],
      startDate: [''],
      endDate: [''],
      result: [''],
      austriaHungaryArmy: [''],
      austriaHungaryArmyNumber: [''],
      russianArmyNumber: [''],
      russianArmy: [''],
      note: [''],
    });
    this.meta.addTags([
      { name: 'battle:card', content: 'battle' },
    ]);
  }

  ngOnInit(): void {

    this.appState$ = this.appStateService
      .getState$()

    this.appState$.subscribe((state) => {
      this.username = state.username
    })
    var southWest = L.latLng(47.482634, 16.384388),
    northEast = L.latLng(50.037094, 22.97873),
    mybounds = L.latLngBounds(southWest, northEast);
    this.globalMap = L.map('slovakiaMapBattle', {minZoom:7}).setView([48.669, 19.699], 7).setMaxBounds(mybounds);
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    // const tiles
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(this.globalMap);
    // this above loads and setts up a map


    this.globalMap.on("dblclick", (event: any ) => {
      var coord = event.latlng.toString().split(',');

      var lat = coord[0].split('(');
      var lng = coord[1].split(')');
      this.globalMap.setView([lat[1],lng[0]], 12);
  });

    this.globalMap.on('click',  (e: any) => {
      var coord = e.latlng.toString().split(',');
      var lat = coord[0].split('(');
      var lng = coord[1].split(')');
      this.currentGPS = lat[1] + lng[0];
      this.battleForm.controls['GPS'].setValue(this.currentGPS);
    });

  }

  submit() {
    let battleInfomration = this.battleForm.value;
    battleInfomration.addedBy = this.username;
    this.addInformationService
      .addBattle(battleInfomration)
      .pipe(
        tap((response: battleResponse) => {
          this.notificationService.success('Boj bol úspešne pridaný');

          this.router.navigate(['/'], {
            queryParams: { cemeteryAdded: 'true' },
          });
        }),
        catchError((error) => {
          this.notificationService.error('Nezadal si všetky potrebné údaje');
          // this.battleForm;
          // // .get('username')!
          // // .setErrors({ badRequest: true, required: true });
          // this.battleForm;
          // .get('password')!
          // .setErrors({ badRequest: true, required: true });
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = `Error: ${error.message}`;
          }
          return of([]);
        })
      )
      .subscribe();
  }
}
