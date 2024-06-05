import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AppStateService } from '../partials/services/app-state/app-state.service';
import { HistorianserviceService } from './historianservice.service';


@Injectable({
  providedIn: 'root'
})
export class HistorianGuardGuard implements CanActivate {
  constructor(
    protected readonly historianService: HistorianserviceService,
    protected readonly router: Router,
    private readonly appStateService: AppStateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.verifyAuthTokenValidity();
  }

  private verifyAuthTokenValidity() {
    const token = this.appStateService.getStateSnapshot().accessToken;

    if (token === null || token === '') {
      this.router.navigate(['/']);
      return false;
    }

    return this.historianService.verifyToken().pipe(
      take(1),
      tap((isValid: boolean) => {
        if (!isValid) {
          this.router.navigate(['/']);
        }
      })
    );
  }

}
