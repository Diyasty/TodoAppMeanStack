import { map } from 'rxjs/operators';
import { isAuthenticated } from './../store/auth/index';
import { AppState } from './../store/app-store.module';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(isAuthenticated).pipe(
      map((data) => {
        if (!data) {
          return this.router.createUrlTree(['auth']);
        }
        return true;
      })
    );
  }
}
