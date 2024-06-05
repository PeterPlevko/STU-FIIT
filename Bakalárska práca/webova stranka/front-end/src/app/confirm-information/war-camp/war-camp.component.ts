import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { LoginService } from 'src/app/login/services/login.service';
import { LoginResponse } from 'src/app/login/types/loginTypes';
import { NotificationService } from 'src/app/partials/services/notification.service';

import { ConfirmInformationService } from '../services/confirm-information.service';
import { warCampResponse } from '../types/warCampTypes';

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
  warCampID: string = '';
  warCamp = {} as any;
  warCampEquipmentForm: FormGroup;
  warCampForm: FormGroup;
  errorMsg: string | undefined;
  selectedValue: string | undefined;
  username: string = '';
  informationTypes: informationType[] = [
    { value: 'vojaci', viewValue: 'vojaci' },
    { value: 'dôstojníci', viewValue: 'dôstojníci' },
    { value: 'vojaci-dôstojníci', viewValue: 'vojaci-dôstojníci' },
  ];

  constructor(
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private confirmInformationService: ConfirmInformationService,
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
  }

  ngOnInit(): void {
    this.confirmInformationService
      .getWarCamp()
      .pipe(
        tap((warcamp: any) => {
          this.warCamp = warcamp;
          this.warCampID = warcamp._id;
          this.username = warcamp.addedBy;

          this.selectedValue = warcamp.campType;
          this.warCamp.equipment.forEach((element: any) => {
            if (element.lazaret !== undefined) {
              this.warCampEquipmentForm.patchValue({
                lazaret: true,
              });
            }
            if (element.desinfectStation !== undefined) {
              this.warCampEquipmentForm.patchValue({
                desinfectStation: true,
              });
            }
            if (element.mobileOperationComando !== undefined) {
              this.warCampEquipmentForm.patchValue({
                mobileOperationComando: true,
              });
            }
            if (element.lazaret !== undefined) {
              this.warCampEquipmentForm.patchValue({
                lazaret: true,
              });
            }
            if (element.crypt !== undefined) {
              this.warCampEquipmentForm.patchValue({
                crypt: true,
              });
            }
            if (element.hospital !== undefined) {
              this.warCampEquipmentForm.patchValue({
                hospital: true,
              });
            }
            if (element.mausoleum !== undefined) {
              this.warCampEquipmentForm.patchValue({
                mausoleum: true,
              });
            }
          });
        }),
        catchError((error) => {
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
    warCampInfo.id = this.warCampID;
    warCampInfo.addedBy = this.username;

    this.confirmInformationService
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
          // this.memorialForm
          //   .get('username')!
          //   .setErrors({ badRequest: true, required: true });
          // this.memorialForm
          //   .get('password')!
          //   .setErrors({ badRequest: true, required: true });
          this.notificationService.error('Nezadal si všetky potrebné údaje');
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

  remove() {

    this.confirmInformationService
      .removeWarCamp(this.warCampID)
      .pipe(
        tap((response: warCampResponse) => {
          this.notificationService.success(
            'Zajatecký tábor bol úspešne odstránený'
          );

          this.router.navigate(['/'], {
            // queryParams: { logged: 'true' },
          });
        }),
        catchError((error) => {
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
