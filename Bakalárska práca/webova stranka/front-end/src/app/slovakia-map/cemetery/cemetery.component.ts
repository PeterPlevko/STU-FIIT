import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { tap, catchError, of, Observable } from 'rxjs';
import { NotificationService } from 'src/app/partials/services/notification.service';
import { AddInformationService } from '../services/add-information.service';
import { cemeteryResponse } from '../types/cemeteryTypes';
import { State } from '../../partials/services/app-state/types/appStateTypes';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-cemetery',
  templateUrl: './cemetery.component.html',
  styleUrls: ['./cemetery.component.scss'],
})
export class CemeteryComponent implements OnInit {
  appState$: Observable<State> | undefined; // this is needed to use appstate
  username: string = '';
  nationailities: string[] = [];
  deathReasons: string[] = [];
  deathDates: string[] = [];
  cemeteryForm: FormGroup;
  errorMsg: string | undefined;
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
    this.cemeteryForm = this.formBuilder.group({

      GPS: ['', [Validators.required]],
      cemeteryType: [''],
      nationality: [''],
      reasonOfDeath: [''],
      dateOfDeath: [''],
      numberOfGraves: [''],
      numberOfBurried: [''],
    });
    this.meta.addTags([
      { name: 'cemetery:card', content: 'cemetery' },
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
  this.globalMap = L.map('slovakiaMapCemetery', {minZoom:7}).setView([48.669, 19.699], 7).setMaxBounds(mybounds);

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
      this.cemeteryForm.controls['GPS'].setValue(this.currentGPS);
    });

  }

  submit() {
    let cemeteryInformation = this.cemeteryForm.value;
    cemeteryInformation.nationality = this.nationailities;
    cemeteryInformation.reasonOfDeath = this.deathReasons;
    cemeteryInformation.dateOfDeath = this.deathDates;
    cemeteryInformation.addedBy = this.username

    this.addInformationService
      .addCemetery(cemeteryInformation)
      .pipe(
        tap((response: cemeteryResponse) => {
          this.notificationService.success('Cintorín bol úspešne pridaný');

          this.router.navigate(['/'], {
            queryParams: { cemeteryAdded: 'true' },
          });
        }),
        catchError((error) => {
          this.notificationService.error('Nezadal si všetky potrebné údaje');
          // this.cemeteryForm;
          // // .get('username')!
          // // .setErrors({ badRequest: true, required: true });
          // this.cemeteryForm;
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

  addNationality() {
    if(this.cemeteryForm.get('nationality')!.value === '' || this.cemeteryForm.get('nationality')!.value === null){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      if (
        this.nationailities.includes(this.cemeteryForm.get('nationality')!.value)
      ) {
        this.notificationService.error('Duplicitné záznamy su zakázané');
        this.cemeteryForm.controls['nationality'].reset();
      } else {
        this.nationailities.push(this.cemeteryForm.get('nationality')!.value);
        this.cemeteryForm.controls['nationality'].reset();
        this.notificationService.success('Záznam bol pridaný');
      }
    }
  }

  addReasonOfDeath() {
    if(this.cemeteryForm.get('reasonOfDeath')!.value === '' || this.cemeteryForm.get('reasonOfDeath')!.value === null){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      if (
        this.deathReasons.includes(this.cemeteryForm.get('reasonOfDeath')!.value)
      ) {
        this.notificationService.error('Duplicitné záznamy su zakázané');
        this.cemeteryForm.controls['reasonOfDeath'].reset();
      } else {
        this.deathReasons.push(this.cemeteryForm.get('reasonOfDeath')!.value);
        this.cemeteryForm.controls['reasonOfDeath'].reset();
        this.notificationService.success('Záznam bol pridaný');
      }
    }
  }

  addDateOfDeath() {
    if(this.cemeteryForm.get('dateOfDeath')!.value === '' || this.cemeteryForm.get('dateOfDeath')!.value === null){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      this.deathDates.push(this.cemeteryForm.get('dateOfDeath')!.value);
      this.cemeteryForm.controls['dateOfDeath'].reset();
      this.notificationService.success('Záznam bol pridaný');
    }
  }
}
