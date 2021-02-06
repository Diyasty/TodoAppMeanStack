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
  isUser!: boolean;

  ngOnInit(): void {
    console.log(this.isUser);
    this.auth.getAuthStatusListener().subscribe((user) => (this.isUser = user));
    this.isUser = !!localStorage.getItem('user');
    console.log(this.isUser);
  }
  logout() {
    console.log('//#logout ');

    this.auth.logout();
  }
  isCollapsed = false;
}
