import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, of, tap, throwError } from 'rxjs';
import { NotificationService } from 'src/app/partials/services/notification.service';

import { RegisterService } from '../../services/register.service';

import { RegisterResponse } from '../../types/registerTypes';

export class PasswordError implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(
      control?.parent?.invalid && control?.parent?.dirty
    );

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  passwordMatcher = new PasswordError();
  errorMsg: string | undefined;

  constructor(
    private meta: Meta,
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private registerService: RegisterService,
    public router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        firstname: ['', [Validators.required]],
        surname: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
    this.meta.addTags([
      { name: 'register:card', content: 'register' },
    ]);
  }

  ngOnInit(): void {}

  submit() {


    this.registerService
    .checkUsername(this.registerForm.controls['username'].value)
    .pipe(
      tap((response: any) => {

        if(response !== null){
          this.notificationService.error('Takéto meno už existuje');
        }
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

    const registerCredentials = this.registerForm.value;

    this.registerService
      .register(registerCredentials)
      .pipe(
        tap((response: RegisterResponse) => {

          this.router.navigate(['login'], {
            queryParams: { registered: 'true' },
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

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    if (this.registerForm == null) {
      return null;
    } else {
      let pass = this.registerForm.get('password')!.value;
      let confirmPass = this.registerForm.get('confirmPassword')!.value;


      return pass === confirmPass ? null : { notSame: true };
    }
  };
}
