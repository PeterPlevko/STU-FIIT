import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterCredentials, RegisterResponse } from '../types/registerTypes';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private readonly httpClient: HttpClient) {}

  register(
    registerCredentials: RegisterCredentials
  ): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(
      environment.baseUrl + '/auth/register',
      registerCredentials
    );
  }

  checkUsername(
    username: any
  ): Observable<any> {

    return this.httpClient.post<any>(
      environment.baseUrl + '/auth/checkUsername',
      {username: username}
    );
  }

}
