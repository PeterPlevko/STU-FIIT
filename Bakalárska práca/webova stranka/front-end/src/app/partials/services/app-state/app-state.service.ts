import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../../localStorage/local-storage.service';
LocalStorageService;
import { State } from './types/appStateTypes';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private _state$ = new BehaviorSubject<State>({
    accessToken: '',
    userType: '',
    username: '',
  });
  public state$: Observable<State> = this._state$.asObservable();
  constructor(private localStorageService: LocalStorageService) {
    const defaultState = {
      accessToken: '',
      userType: '',
      username: '',
    };
    let initState = JSON.parse(localStorage.getItem('state')!);

    if (initState === null) {
      initState = defaultState;
    }

    this.setState(initState);
  }

  patchState(newData: any) {
    const currentState = this._state$.value;
    const newState = { ...currentState, ...newData };
    this._state$.next(newState);
    this.localStorageService.setItem('state', `${JSON.stringify(newState)}`);
  }

  getState$() {
    return this.state$;
  }

  getStateSnapshot() {
    return this._state$.value;
  }

  setState(newState: any) {
    this._state$.next(newState);
    this.localStorageService.setItem('state', `${JSON.stringify(newState)}`);
  }

  logoutResetState() {
    this.patchState({
      accessToken: '',
      userType: '',
      username: '',
    });
  }
}
