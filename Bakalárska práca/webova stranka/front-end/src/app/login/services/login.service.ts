import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials, LoginResponse } from '../types/loginTypes';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly httpClient: HttpClient) {}

  login(loginCredentials: LoginCredentials): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      environment.baseUrl + '/auth/login',
      loginCredentials
    );
  }
}
