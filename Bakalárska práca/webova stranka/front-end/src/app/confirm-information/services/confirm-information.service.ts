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
export class ConfirmInformationService {
  constructor (private httpClient: HttpClient, private appStateService: AppStateService) {}

  createAuthorizationHeader() {
    return new HttpHeaders({
      authorization: `bearer ${this.appStateService.getStateSnapshot().accessToken}`,
    });
  }

  getSoldier(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/confirm-information/getSoldier', { headers: headers }
    );
  }

  getCemetery(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/confirm-information/getCemetery', { headers: headers }
    );
  }

  getBattle(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/confirm-information/getBattle', { headers: headers }
    );
  }

  getMemorial(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/confirm-information/getMemorial', { headers: headers }
    );
  }

  getWarCamp(): any {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<number>(
      environment.baseUrl + '/confirm-information/getWarCamp', { headers: headers }
    );
  }
  // here starts change of state
  addWarCamp(battleInformation: any): Observable<warCampResponse>{
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<warCampResponse>(
      environment.baseUrl + '/confirm-information/addWarCamp',
      battleInformation, { headers: headers }
    );
  }

  // remove war camp
  removeWarCamp(warCampID: string): Observable<warCampResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.delete<warCampResponse>(
      environment.baseUrl + `/confirm-information/removeWarCamp/${warCampID}`, { headers: headers }
    );
  }

  addBattle(battleInformation: any): Observable<battleResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<battleResponse>(
      environment.baseUrl + '/confirm-information/addBattle',
      battleInformation, { headers: headers }
    );
  }

  removeBattle(battleID: string): Observable<battleResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.delete<battleResponse>(
      environment.baseUrl + `/confirm-information/removeBattle/${battleID}`, { headers: headers }
    );
  }

  // this changes soldiers state to confirmed
  addSoldier(soldierInformation: any): Observable<soldierResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<soldierResponse>(
      environment.baseUrl + '/confirm-information/addSoldier',
      soldierInformation, { headers: headers }
    );
  }

  removeSoldier(soldierID: string): Observable<soldierResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.delete<soldierResponse>(
      environment.baseUrl + `/confirm-information/removeSoldier/${soldierID}`, { headers: headers }
    );
  }

  // this changes cemetery state to confirmed
  addCemetery(cemeteryInformation: any): Observable<cemeteryResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<cemeteryResponse>(
      environment.baseUrl + '/confirm-information/addCemetery',
      cemeteryInformation, { headers: headers }
    );
  }

  removeCemetery(cemeteryID: string): Observable<cemeteryResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.delete<cemeteryResponse>(
      environment.baseUrl + `/confirm-information/removeCemetery/${cemeteryID}`, { headers: headers }
    );
  }

  // this changes cemetery state to confirmed
  addMemorial(memorialInformation: any): Observable<memorialResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<memorialResponse>(
      environment.baseUrl + '/confirm-information/addMemorial',
      memorialInformation, { headers: headers }
    );
  }

  removeMemorial(memorialID: string): Observable<memorialResponse> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.delete<memorialResponse>(
      environment.baseUrl + `/confirm-information/removeMemorial/${memorialID}`, { headers: headers }
    );
  }

  getImage(imagePath: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<any>(
      environment.baseUrl + `/confirm-information/file`,
      { imagePath },
      { responseType: 'blob' as 'json', headers: headers }
    );
  }
}
