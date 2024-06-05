import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppStateService } from '../../services/app-state/app-state.service';
@Injectable({
  providedIn: 'root',
})
@Injectable()
export class HeaderService {
  constructor (private httpClient: HttpClient, private appStateService: AppStateService) {}

  createAuthorizationHeader() {
    return new HttpHeaders({
      authorization: `bearer ${this.appStateService.getStateSnapshot().accessToken}`,
    });
  }


  getConfirmationCount(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/confirm-information/getAllUnconfirmedCount', { headers: headers }
    );
  }
  getUserByUsername(username: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<any>(
      environment.baseUrl + '/auth/getUserByUsername',
      {username:username}, { headers: headers }
    );
  }

  invalidateJWT(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<any>(
      environment.baseUrl + '/auth/logout', {},
      { headers: headers }
    );
  }
}
