import { Router } from '@angular/router';
import { ResponseData } from './../../../models/response';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from './../../../auth/auth.service';
import { AuthActions } from './../actions/Auth.action';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private Action$: Actions,
    private AuthSer: AuthService
  ) {}

  login$ = createEffect(() => {
    return this.Action$.pipe(
      ofType(AuthActions.login),
      
      exhaustMap((action) => {
        return this.AuthSer.login(action.user).pipe(
          map((data: any) => {
            console.log(data);
            return AuthActions.loginSuccess({
              user: data,
            });
          }),
          catchError((err) => {
            console.log(err);
            return of(AuthActions.loginError({ error: err.error.message }));
          })
        );
      })
    );
  });

  SuccessRoute$ = createEffect(
    () => {
      return this.Action$.pipe(
        ofType(AuthActions.loginSuccess),
        map((data: any) => {
          this.AuthSer.setItem(data.user);
          this.router.navigate(['/todos']);
        })
      );
    },
    {
      dispatch: false,
    }
  );
  logout$ = createEffect(
    () => {
      return this.Action$.pipe(
        ofType(AuthActions.logout),
        map((data: any) => {
          this.AuthSer.logout();
          this.router.navigate(['/auth/login']);
        })
      );
    },
    {
      dispatch: false,
    }
  );
  loginAuto$ = createEffect(() => {
    return this.Action$.pipe(
      ofType(AuthActions.AutoLogin),
      mergeMap((data: any) => {
        const user = this.AuthSer.getIsAuth();
        return of(AuthActions.loginSuccess({ user: user }));
      })
    );
  });

  //     map((act) => act.user),

  //     exhaustMap((action) => {
  //       return this.http.post(`${environment.BASEURL}/auth/login`, action).pipe(
  //         map((data: any) => {
  //           return AuthActions.loginSuccess({
  //             user: data.user,
  //             token: data.token,
  //           });
  //         }),
  //         catchError((err) => of(AuthActions.loginError({ error: err })))
  //       );

  //       // return this.AuthSer.login(action).pipe(
  //       //   map((data: any) => {
  //       //     console.log(data);
  //       //     return AuthActions.loginSuccess({
  //       //       user: data.user,
  //       //       token: data.token,
  //       //     });
  //       //   })
  //       // );
  //     })
  //   );
  // });
}
