import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppStateService } from '../partials/services/app-state/app-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private appStateService: AppStateService) { }

  createAuthorizationHeader() {
    return new HttpHeaders({
      authorization: `bearer ${this.appStateService.getStateSnapshot().accessToken}`,
    });
  }

  verifyToken(): Observable<boolean> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<boolean>(
      environment.baseUrl + '/isUser', { headers: headers }
    );
  }
}
