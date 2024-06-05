import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { NotificationService } from 'src/app/partials/services/notification.service';

import { ConfirmInformationService } from '../services/confirm-information.service';
import { cemeteryResponse } from '../types/cemeteryTypes';

@Component({
  selector: 'app-cemetery',
  templateUrl: './cemetery.component.html',
  styleUrls: ['./cemetery.component.scss'],
})
export class CemeteryComponent implements OnInit {
  globalIdIndex = 0;
  nationalityFlag: boolean = false;
  reasonOfDeathFlag: boolean = false;
  dateOfDeathFlag: boolean = false;
  cemetery = {} as any;
  cemeteryID: string = '';
  username: string = '';
  nationalityes: string[] = [];
  deathReasons: string[] = [];
  deathDates: any[] = [];
  cemeteryForm: FormGroup;
  errorMsg: string | undefined;

  constructor(
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private confirmInformationService: ConfirmInformationService,
    private meta: Meta,
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
    this.confirmInformationService
      .getCemetery()
      .pipe(
        tap((cemetery: any) => {


          this.cemetery = cemetery;
          this.cemeteryID = cemetery._id;
          this.nationalityes = cemetery.nationality;
          this.deathReasons = cemetery.reasonOfDeath;


          let deathDatesUpdated:any = []
          cemetery.dateOfDeath.forEach((element: any, index: any) => {
            deathDatesUpdated.push({"id": `${element}-${index}`, "element": element});

          })


          this.deathDates = deathDatesUpdated;
          this.globalIdIndex = this.deathDates.length;

          this.username = cemetery.addedBy;
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

    let cemeteryInformation = this.cemeteryForm.value;
    cemeteryInformation.nationality = this.nationalityes;
    cemeteryInformation.reasonOfDeath = this.deathReasons;


    let deathDatesUpdated:any = []
    this.deathDates.forEach((element: any) => {
      deathDatesUpdated.push(element.element);
    })

    cemeteryInformation.dateOfDeath = deathDatesUpdated



    cemeteryInformation.id = this.cemeteryID;
    cemeteryInformation.addedBy = this.username;

    this.confirmInformationService
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

  remove() {
    this.confirmInformationService
      .removeCemetery(this.cemeteryID)
      .pipe(
        tap((response: cemeteryResponse) => {
          this.notificationService.success('Boj bol úspešne odstránený');

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





  addNationality() {

    if(this.cemeteryForm.get('nationality')!.value === '' || this.cemeteryForm.get('nationality')!.value === null){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      if (
        this.nationalityes.includes(this.cemeteryForm.get('nationality')!.value)
      ) {
        this.notificationService.error('Duplicitné záznamy su zakázané');
        this.cemeteryForm.controls['nationality'].reset();
      } else {
        this.nationalityes.push(this.cemeteryForm.get('nationality')!.value);
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
    if(this.cemeteryForm.get('dateOfDeath')!.value === '' || this.cemeteryForm.get('dateOfDeath')!.value === null ){
      this.notificationService.error('Nemôžeš pridať prázdnu hodnotu');
    }
    else{
      this.deathDates.push({"id": `${this.cemeteryForm.get('dateOfDeath')!.value}-${this.globalIdIndex}`, "element": this.cemeteryForm.get('dateOfDeath')!.value});
      this.cemeteryForm.controls['dateOfDeath'].reset();
      this.globalIdIndex++;
      this.notificationService.success('Záznam bol pridaný');
    }
  }

  onClickUpdateReason(event: any, reason: any) {
    let id = event._elementRef.nativeElement.id;
    if (this.deathReasons.includes(reason)) {
      this.notificationService.error('Duplicitné záznamy su zakázané');
      (<HTMLInputElement>document.getElementById(id)).value = id;
    } else {
      this.deathReasons.forEach((element: any, index: any, array: any) => {
        if (element === id) {
          array[index] = reason;
          event._elementRef.nativeElement.id = reason;
          this.notificationService.success('Záznam bol úspešne zmenený');
        }
      });
    }
  }

  onClickUpdateNationality(event: any, nationality: any) {
    let id = event._elementRef.nativeElement.id;

    if (this.nationalityes.includes(nationality)) {
      this.notificationService.error('Duplicitné záznamy su zakázané');
      (<HTMLInputElement>document.getElementById(id)).value = id;
    } else {
      this.nationalityes.forEach((element: any, index: any, array: any) => {
        if (element === id) {
          array[index] = nationality;
          event._elementRef.nativeElement.id = nationality;
          this.notificationService.success('Záznam bol úspešne zmenený');
        }
      });
    }
  }

  onClickDeleteNationality(event: any) {
    let id = event._elementRef.nativeElement.id;

    this.nationalityes.forEach((element: any, index: any) => {
      if (element === id) {
        this.nationalityes.splice(index, 1);
      }
    });
  }

  // addDateOfDeath() {
  //   if (
  //     this.dateOfDeaths.includes(this.memorialForm.get('dateOfDeath')!.value)
  //   ) {
  //     this.notificationService.error('Duplicitné záznamy su zakázané');
  //     this.memorialForm.controls['dateOfDeath'].reset();
  //   } else {
  //     this.dateOfDeaths.push(this.memorialForm.get('dateOfDeath')!.value);
  //     this.memorialForm.controls['dateOfDeath'].reset();
  //   }
  // }

  onClickDeleteReason(event: any) {
    let id = event._elementRef.nativeElement.id;

    this.deathReasons.forEach((element: any, index: any) => {
      if (element === id) {
        this.deathReasons.splice(index, 1);
      }
    });
  }

  onClickUpdateDate(event: any, date: any) {
    let id = event._elementRef.nativeElement.id;
    let name = id.split('-')[0];

      this.deathDates.forEach((element: any, index: any, array: any) => {
        if (element.element === name && element.id === id) {
          array[index] = {'id': `${date}-${this.globalIdIndex}`, "element": date};
          event._elementRef.nativeElement.id = `${date}-${this.globalIdIndex}`;
          this.notificationService.success('Záznam bol úspešne zmenený');
          this.globalIdIndex++;
        }
      });

  }

  onClickDeleteDate(event: any) {
    let id = event._elementRef.nativeElement.id;
    let name = id.split('-')[0];

    this.deathDates.forEach((element: any, index: any) => {

      if (element.element === name && element.id === id) {

        this.deathDates.splice(index, 1);
      }
    });
  }

  changeReasonOfDeath() {
    this.reasonOfDeathFlag = !this.reasonOfDeathFlag;
    this.dateOfDeathFlag = false;
    this.nationalityFlag = false;
  }

  changeDateOfDeath() {
    this.dateOfDeathFlag = !this.dateOfDeathFlag;
    this.reasonOfDeathFlag = false;
    this.nationalityFlag = false;
  }
  changeNationality() {
    this.nationalityFlag = !this.nationalityFlag;
    this.dateOfDeathFlag = false;
    this.reasonOfDeathFlag = false;
  }
}
