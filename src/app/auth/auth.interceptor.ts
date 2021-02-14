import { mergeMap, take } from 'rxjs/operators';
import { AuthToken } from './../store/auth/index';
import { Store } from '@ngrx/store';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService: any;
  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(AuthToken).pipe(
      take(1),
      mergeMap((token) => {
        const authToken = token;
        if (!authToken) {
          return next.handle(req);
        }
        const authRequest = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + authToken),
        });
        console.log(authRequest);
        return next.handle(authRequest);
      })
    );
    // const authToken = this.store.select(AuthToken);

    // const authRequest = req.clone({
    //   headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    // });
    // return next.handle(authRequest);
  }
}
