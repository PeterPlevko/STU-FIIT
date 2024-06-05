import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta } from '@angular/platform-browser';
import { catchError, Observable, of, takeUntil, tap } from 'rxjs';
import { DisposableComponent } from '../disposable/disposable-components';
import { AppStateService } from '../services/app-state/app-state.service';
import { State } from '../services/app-state/types/appStateTypes';
import { NotificationService } from '../services/notification.service';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends DisposableComponent implements OnInit {
  appState$: Observable<State> | undefined; // this is needed to use appstate
  confirmationCount: number | undefined;
  errorMsg: string = '';
  constructor(
    private appStateService: AppStateService,
    private headerService: HeaderService,
    public notificationService: NotificationService,
    public dialog: MatDialog,
    private meta: Meta,
  ) {
    super();
    this.meta.addTags([
      { name: 'header:card', content: 'header' },
    ]);
  }

  ngOnInit(): void {

    this.appState$ = this.appStateService
      .getState$()
      .pipe(takeUntil(this.destroySignal$));

      this.appState$.subscribe(
        (appState: State) => {
          if(appState.userType === "historian"){
            this.headerService
            .getConfirmationCount()
            .pipe(
              tap((count: any) => {

                this.confirmationCount = count;
              }),
              catchError((error) => {
                return of([]);
              })
            )
            .subscribe();
          }
        }
      )




  }

  showInformation(appState: any){


    this.headerService
        .getUserByUsername(appState.username)
        .pipe(
          tap((response: any) => {
            const dialogRef = this.dialog.open(EditDialogComponent, {
              data: {user: response}
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result === 1) {
                this.notificationService.success("Bol si úspešne odhlásený");

                this.headerService
                .invalidateJWT()
                .pipe(
                  tap((response: any) => {

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

                this.appStateService.logoutResetState();



              }

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
