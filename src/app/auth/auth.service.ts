import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { shareReplay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthActions } from '../store/auth/actions/Auth.action';
import { AppState } from '../store/app-store.module';
import { errorMassage } from '../store/auth';
export interface ILogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private r: Router,
    private readonly store: Store<AppState>
  ) {}
  private token!: string;
  private isAuthenticated!: boolean;
  private authStatusListener = new Subject<boolean>();
  errMassage!: Observable<string>;
  getToken() {
    return this.token || localStorage.getItem('token');
  }

  login(data: ILogin) {
    return this.http
      .post(`${environment.BASEURL}/auth/login`, data)
      .pipe(shareReplay())
      .subscribe(
        (response: any) => {
          this.token = response.token;
          this.setItem(response.token, response.user);
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          this.store.dispatch(
            AuthActions.loginSuccess({
              user: response.user,
              token: response.token,
            })
          );
          this.r.navigate(['/todos']);
        },
        (error) => {
          console.log(error);
          this.store.dispatch(AuthActions.loginError(error));
          this.errMassage = this.store.select(errorMassage);
          this.authStatusListener.next(false);
        }
      );

    // .subscribe((data: any) => {
    //   this.token = data.token;
    //   this.setItem(data.token, data.user);
    //   this.r.navigate(['/todos']);
    // });
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  private setItem(token: string, user: {}) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.authStatusListener.next(false);
    localStorage.clear();
    this.r.navigate(['/auth/login']);
  }
}
