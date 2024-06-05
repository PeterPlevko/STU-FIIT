import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../types/loginTypes';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { NotificationService } from 'src/app/partials/services/notification.service';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private appstateService: AppStateService,
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private loginService: LoginService,
    public router: Router,
    private meta: Meta,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.meta.addTags([
      { name: 'login:card', content: 'login' },
    ]);
  }

  errorMsg: string | undefined;

  loginForm: FormGroup;
  ngOnInit(): void {}

  submit() {
    const loginCredentials = this.loginForm.value;
    this.loginService
      .login(loginCredentials)
      .pipe(
        tap((response: LoginResponse) => {
          this.notificationService.success('Bol si úspešne prihlásený');
          const userType = jwtDecode<JwtPayload & { userType: string }>(
            response.accessToken
          ).userType;


          this.appstateService.patchState({
            accessToken: response.accessToken,
            userType: userType,
            username: loginCredentials.username,
          });


          this.router.navigate(['/'], {
            // queryParams: { logged: 'true' },
          });
        }),
        catchError((error) => {
          this.loginForm
            .get('username')!
            .setErrors({ badRequest: true, required: true });
          this.loginForm
            .get('password')!
            .setErrors({ badRequest: true, required: true });

          // this calls bad login warning

          this.notificationService.error('Bad login credentials');

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
