import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { cemeteryResponse } from '../types/cemeteryTypes';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { battleResponse } from '../types/battleTypes';
import { NotificationService } from 'src/app/partials/services/notification.service';
import { ConfirmInformationService } from '../services/confirm-information.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  battleForm: FormGroup;
  battle = {} as any;
  battleID: string = '';
  username: string = '';
  errorMsg: string | undefined;

  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private meta: Meta,
    private readonly formBuilder: FormBuilder,
    private confirmInformationService: ConfirmInformationService,
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
    this.confirmInformationService
      .getBattle()
      .pipe(
        tap((battle: any) => {
          this.battle = battle;
          this.battleID = battle._id;
          this.username = battle.addedBy;
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
    let battleInfomration = this.battleForm.value;
    battleInfomration.id = this.battleID;
    battleInfomration.addedBy = this.username;

    this.confirmInformationService
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

  remove() {
    this.confirmInformationService
      .removeBattle(this.battleID)
      .pipe(
        tap((response: battleResponse) => {
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
}
