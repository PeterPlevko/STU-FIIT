import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';
import { environment } from 'src/environments/environment';
import { battleResponse } from '../types/battleTypes';
import { cemeteryResponse } from '../types/cemeteryTypes';
import { memorialResponse } from '../types/memorialTypes';
import { soldierResponse } from '../types/soldierTypes';
import { warCampResponse } from '../types/warCampTypes';

@Injectable({
  providedIn: 'root',
})
export class AddInformationService {
  constructor (private httpClient: HttpClient, private appStateService: AppStateService) {}

  createAuthorizationHeader() {
    return new HttpHeaders({
      authorization: `bearer ${this.appStateService.getStateSnapshot().accessToken}`,
    });
  }

  addCemetery(cemeteryInformation: any): Observable<cemeteryResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<cemeteryResponse>(
      environment.baseUrl + '/add-information/cemetery',
      cemeteryInformation, { headers: headers }
    );
  }

  addMemorial(memorialInformation: any): Observable<memorialResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<memorialResponse>(
      environment.baseUrl + '/add-information/memorial',
      memorialInformation, { headers: headers }
    );
  }

  addSoldier(soldierInformation: any): Observable<battleResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<soldierResponse>(
      environment.baseUrl + '/add-information/soldier',
      soldierInformation, { headers: headers }
    );
  }

  addWarCamp(warCampInformation: any): Observable<warCampResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<warCampResponse>(
      environment.baseUrl + '/add-information/warcamp',
      warCampInformation, { headers: headers }
    );
  }

  addBattle(battleInformation: any): Observable<battleResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<battleResponse>(
      environment.baseUrl + '/add-information/battle',
      battleInformation, { headers: headers }
    );
  }

  // gettters for my map with default values
  getSoldierDefault(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/show-information/getSoldierDefault', { headers: headers }
    );
  }

  getMemorialDefault(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/show-information/getMemorialDefault', { headers: headers }
    );
  }

  getWarCampDefault(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/show-information/getWarCampDefault', { headers: headers }
    );
  }

  getCemeteryDefault(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/show-information/getCemeteryDefault', { headers: headers }
    );
  }

  getBattleDefault(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/show-information/getBattleDefault', { headers: headers }
    );
  }
  // getters for my map with added values
  getSoldierAdded(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/show-information/getSoldierAdded', { headers: headers }
    );
  }

  getMemorialAdded(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/show-information/getMemorialAdded', { headers: headers }
    );
  }

  getWarCampAdded(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/show-information/getWarCampAdded', { headers: headers }
    );
  }

  getCemeteryAdded(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/show-information/getCemeteryAdded', { headers: headers }
    );
  }

  getBattleAdded(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/show-information/getBattleAdded', { headers: headers }
    );
  }

  getAll(params: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get("", { params });
  }

  getImage(imagePath: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<any>(
      environment.baseUrl + `/show-information/file`,
      { imagePath },
      { responseType: 'blob' as 'json', headers: headers }
    );
  }
}
