import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { NotificationService } from 'src/app/partials/services/notification.service';
import { ConfirmInformationService } from '../services/confirm-information.service';

import { memorialResponse } from '../types/memorialTypes';
import { soldierResponse } from '../types/soldierTypes';

@Component({
  selector: 'app-soldier',
  templateUrl: './soldier.component.html',
  styleUrls: ['./soldier.component.scss'],
})
export class SoldierComponent implements OnInit {
  soldier = {} as any;
  soldierID: string = '';
  soldierForm: FormGroup;
  errorMsg: string | undefined;
  username: string = '';
  constructor(
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private confirmInformationService: ConfirmInformationService,
    public router: Router,
    private meta: Meta,
  ) {
    this.soldierForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dateOfBirth: [''],
      dateOfDeath: [''],
      story: [''],
    });
    this.meta.addTags([
      { name: 'soldier:card', content: 'soldier' },
    ]);
  }

  ngOnInit(): void {
    this.confirmInformationService
      .getSoldier()
      .pipe(
        tap((soldier: any) => {

          this.soldier = soldier;
          this.soldierID = soldier._id;
          this.username = soldier.addedBy;
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
    let soldierInformation = this.soldierForm.value;
    soldierInformation.addedBy = this.username;
    soldierInformation.id = this.soldierID;

    this.confirmInformationService
      .addSoldier(soldierInformation)
      .pipe(
        tap((response: soldierResponse) => {
          this.notificationService.success('Vojak bol úspešne pridaný');

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

  remove() {

    this.confirmInformationService
      .removeSoldier(this.soldierID)
      .pipe(
        tap((response: soldierResponse) => {
          this.notificationService.success('Vojak bol úspešne odstránený');

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
