import { map } from 'rxjs/operators';
import { AuthActions } from './store/auth/actions/Auth.action';
import { isAuthenticated } from './store/auth/index';
import { Observable, of } from 'rxjs';
import { AppState } from './store/app-store.module';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private store: Store<AppState>) {}
  isUser!: Observable<boolean>;
  User!: boolean;
  isLoading!: boolean;
  ngOnInit(): void {
    this.isUser = this.store.select(isAuthenticated);
    this.store.dispatch(AuthActions.AutoLogin());
    // console.log(this.isUser);
  }
  logout() {
    this.isLoading = true;
    setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
      this.auth.logout();
      this.isLoading = false;
    }, 3000);
  }
  isCollapsed = false;
}
