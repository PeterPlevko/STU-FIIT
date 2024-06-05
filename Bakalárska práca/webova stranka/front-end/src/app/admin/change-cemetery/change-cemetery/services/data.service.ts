import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppStateService } from 'src/app/partials/services/app-state/app-state.service';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient, private appStateService: AppStateService) {}

  createAuthorizationHeader() {
    return new HttpHeaders({
      authorization: `bearer ${this.appStateService.getStateSnapshot().accessToken}`,
    });
  }

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    const headers = this.createAuthorizationHeader();
    this.httpClient.get<Issue[]>(environment.baseUrl + '/admin/getCemeteries', { headers: headers }).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (issue: Issue): Observable<any> {
    const headers = this.createAuthorizationHeader();
    this.dialogData = issue;
    return this.httpClient.post<any>(
      environment.baseUrl + `/admin/addCemetery/`, issue, { headers: headers }
    );
  }

  updateIssue (issue: Issue): void {
    this.dialogData = issue;
  }


  updateIssueBackend (issue: Issue): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.put<any>(
      environment.baseUrl + `/admin/updateCemetery/`, issue, { headers: headers }
    );
  }

  addIssueBackend (issue: Issue): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.post<any>(
      environment.baseUrl + `/admin/updateCemetery/`, issue, { headers: headers }
    );
  }

  deleteIssue (id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.delete<any>(
      environment.baseUrl + `/admin/deleteCemetery/${id}`, { headers: headers }
        );
  }
}
