import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../ngrx-manage/app/app.state';
import { map, Observable, take } from 'rxjs';
import { getUserData } from '../ngrx-manage/app/app.selector';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(getUserData).pipe(take(1)).pipe(map(data => {
      if (data?.token) return true;
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }))
  }
}