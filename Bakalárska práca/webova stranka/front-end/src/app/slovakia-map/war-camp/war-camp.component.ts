import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { tap, catchError, of, Observable, takeUntil } from 'rxjs';
import { NotificationService } from 'src/app/partials/services/notification.service';
import { State } from '../../partials/services/app-state/types/appStateTypes';
import { AddInformationService } from '../services/add-information.service';
import { warCampResponse } from '../types/warCampTypes';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { Meta } from '@angular/platform-browser';

interface informationType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-war-camp',
  templateUrl: './war-camp.component.html',
  styleUrls: ['./war-camp.component.scss'],
})
export class WarCampComponent implements OnInit {
  username: string = '';
  appState$: Observable<State> | undefined; // this is needed to use appstate
  warCampEquipmentForm: FormGroup;
  warCampForm: FormGroup;
  errorMsg: string | undefined;
  selectedValue: string | undefined;
  cemetery = false;
  mausoleum = false;
  desinfectStation = false;
  hospital = false;
  lazaret = false;
  crypt = false;
  mobileOperationComando = false;
  informationTypes: informationType[] = [
    { value: 'vojaci', viewValue: 'vojaci' },
    { value: 'dôstojníci', viewValue: 'dôstojníci' },
    { value: 'vojaci-dôstojníci', viewValue: 'vojaci-dôstojníci' },
  ];
  currentGPS: string = '';
  globalMap = {} as any;

  constructor(
    private meta: Meta,
    private appStateService: AppStateService,
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private addInformationService: AddInformationService,
    public router: Router
  ) {
    this.warCampEquipmentForm = this.formBuilder.group({
      cemetery: false,
      mausoleum: false,
      desinfectStation: false,
      hospital: false,
      lazaret: false,
      crypt: false,
      mobileOperationComando: false,
    });
    this.warCampForm = this.formBuilder.group({
      GPS: ['', [Validators.required]],
      numberOfCaptives: [''],
      mainCaptiveNationality: [''],
    });
    this.meta.addTags([
      { name: 'war-camp:card', content: 'war camp' },
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
    this.globalMap = L.map('slovakiaMapWarCamp', {minZoom:7}).setView([48.669, 19.699], 7).setMaxBounds(mybounds);
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
      this.warCampForm.controls['GPS'].setValue(this.currentGPS);
    });

  }

  submit() {
    const warCampInfo = this.warCampForm.value;
    // warCampInfo.equipment = this.warCampEquipmentForm.value;
    let equipmentArray = [] as string[];

    let equipment = this.warCampEquipmentForm.value;
    if (equipment.cemetery) {
      equipmentArray.push('cemetery');
    }
    if (equipment.mausoleum) {
      equipmentArray.push('mausoleum');
    }
    if (equipment.desinfectStation) {
      equipmentArray.push('desinfectStation');
    }
    if (equipment.hospital) {
      equipmentArray.push('hospital');
    }
    if (equipment.lazaret) {
      equipmentArray.push('lazaret');
    }
    if (equipment.crypt) {
      equipmentArray.push('crypt');
    }
    if (equipment.mobileOperationComando) {
      equipmentArray.push('mobileOperationComando');
    }
    warCampInfo.equipment = equipmentArray;
    warCampInfo.campType = this.selectedValue;
    // satize when user does not have the required infomration
    if (warCampInfo.campType === undefined) {
      warCampInfo.campType = '';
    }
    if (warCampInfo.numberOfCaptives === '') {
      warCampInfo.numberOfCaptives = null;
    }

    warCampInfo.addedBy = this.username;


    this.addInformationService
      .addWarCamp(warCampInfo)
      .pipe(
        tap((response: warCampResponse) => {
          this.notificationService.success(
            'Zajatecký tábor bol úspešne pridaný'
          );

          this.router.navigate(['/'], {
            // queryParams: { logged: 'true' },
          });
        }),
        catchError((error) => {
          this.notificationService.error('Nezadal si všetky potrebné údaje');
          // this.memorialForm
          //   .get('username')!
          //   .setErrors({ badRequest: true, required: true });
          // this.memorialForm
          //   .get('password')!
          //   .setErrors({ badRequest: true, required: true });
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
