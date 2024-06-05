import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError, of, Observable } from 'rxjs';
import { NotificationService } from 'src/app/partials/services/notification.service';
import { AddInformationService } from '../services/add-information.service';
import { memorialResponse } from '../types/memorialTypes';
import { soldierResponse } from '../types/soldierTypes';
import { State } from '../../partials/services/app-state/types/appStateTypes';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-soldier',
  templateUrl: './soldier.component.html',
  styleUrls: ['./soldier.component.scss'],
})
export class SoldierComponent implements OnInit {
  username: string = '';
  soldierForm: FormGroup;
  errorMsg: string | undefined;
  appState$: Observable<State> | undefined; // this is needed to use appstate
  constructor(
    private meta: Meta,
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private addInformationService: AddInformationService,
    public router: Router,
    private appStateService: AppStateService,
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
    this.appState$ = this.appStateService
      .getState$()

    this.appState$.subscribe((state) => {
      this.username = state.username
    })

  }

  submit() {
    const soldierInfo = this.soldierForm.value;
    soldierInfo.addedBy = this.username;
    this.addInformationService
      .addSoldier(soldierInfo)
      .pipe(
        tap((response: soldierResponse) => {
          this.notificationService.success('Vojak bol úspešne pridaný');

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
}
