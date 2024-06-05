import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError, of, Observable } from 'rxjs';
import { LoginService } from 'src/app/login/services/login.service';
import { LoginResponse } from 'src/app/login/types/loginTypes';
import { memorialResponse } from '../types/memorialTypes';
import { cemeteryResponse } from '../types/cemeteryTypes';
import { AddInformationService } from '../services/add-information.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/partials/services/notification.service';
import * as L from 'leaflet';
import { State } from '../../partials/services/app-state/types/appStateTypes';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-memorial',
  templateUrl: './memorial.component.html',
  styleUrls: ['./memorial.component.scss'],
})
export class MemorialComponent implements OnInit {
  appState$: Observable<State> | undefined; // this is needed to use appstate
  username: string = '';
  fileFlag: boolean = true;
  formData = new FormData();
  deceasedLists: string[] = [];
  dateOfBirths: string[] = [];
  dateOfDeaths: string[] = [];
  memorialForm: FormGroup;
  errorMsg: string | undefined;
  fileName = '';
  file!: File;
  currentGPS: string = '';
  globalMap = {} as any;

  constructor(
    private meta: Meta,
    private http: HttpClient,
    private appStateService: AppStateService,
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private addInformationService: AddInformationService,
    public router: Router
  ) {
    this.memorialForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      GPS: ['', [Validators.required]],
      file: ['', [Validators.required]],
      municipalityDescription: [''],
      location: [''],
      photoDescription: [''],
      deceased: [''],
      dateOfBirth: [''],
      dateOfDeath: [''],
    });
    this.meta.addTags([
      { name: 'memorial:card', content: 'memorial' },
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
    this.globalMap = L.map('slovakiaMapMemorial', {minZoom:7}).setView([48.669, 19.699], 7).setMaxBounds(mybounds);

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
      this.memorialForm.controls['GPS'].setValue(this.currentGPS);
    });

  }

  submit() {
    if(this.fileFlag === false){
      const formData = new FormData();
    formData.append('file', this.file);
    formData.append('GPS', this.memorialForm.get('GPS')!.value);
    formData.append(
      'municipalityDescription',
      this.memorialForm.get('municipalityDescription')!.value
    );
    formData.append('location', this.memorialForm.get('location')!.value);
    formData.append('addedBy', this.username);
    formData.append(
      'photoDescription',
      this.memorialForm.get('photoDescription')!.value
    );

    for (const deceased of this.deceasedLists) {
      formData.append('deceasedList', deceased);
    }

    for (const birth of this.dateOfBirths) {
      formData.append('dateOfBirth', birth);
    }
    for (const death of this.dateOfDeaths) {
      formData.append('dateOfDeath', death);
    }
    formData.append('name', this.memorialForm.get('name')!.value);

    this.addInformationService
      .addMemorial(formData)
      .pipe(
        tap((response: memorialResponse) => {
          this.notificationService.success('Pamätník bol úspešne pridaný');

          this.router.navigate(['/'], {
            queryParams: { cemeteryAdded: 'true' },
          });
        }),
        catchError((error) => {
          this.notificationService.error('Nezadal si všetky potrebné údaje');
          // .get('username')!
          // .setErrors({ badRequest: true, required: true });

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
    else{
      this.notificationService.error('Musíš pridať súbor');
    }



  }

  addDeceased() {
    if(this.memorialForm.get('deceased')!.value === '' || this.memorialForm.get('deceased')!.value === null){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      this.deceasedLists.push(this.memorialForm.get('deceased')!.value);
      this.memorialForm.controls['deceased'].reset();
      this.notificationService.success('Záznam bol pridaný');
    }
  }

  addBirthDate() {
    if(this.memorialForm.get('dateOfBirth')!.value === '' || this.memorialForm.get('dateOfBirth')!.value === null){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      this.dateOfBirths.push(this.memorialForm.get('dateOfBirth')!.value);
      this.memorialForm.controls['dateOfBirth'].reset();
      this.notificationService.success('Záznam bol pridaný');
    }
  }

  addDateOfDeath() {
    if(this.memorialForm.get('dateOfDeath')!.value === '' || this.memorialForm.get('dateOfDeath')!.value === null){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      this.dateOfDeaths.push(this.memorialForm.get('dateOfDeath')!.value);
      this.memorialForm.controls['dateOfDeath'].reset();
      this.notificationService.success('Záznam bol pridaný');
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];

    if (this.file) {
      this.memorialForm.controls['file'].setErrors(null);
      this.fileName = this.file.name;
      this.fileFlag = false;
    }
  }
}
