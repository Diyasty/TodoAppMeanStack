import { map, exhaustMap, tap } from 'rxjs/operators';
import { AuthActions } from './../store/auth/actions/Auth.action';
import { AuthService, ILogin } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app-store.module';
import { errorMassage } from '../store/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private AuthSer: AuthService,
    private readonly store: Store<AppState>
  ) {}
  Data!: ILogin;
  isLoading!: boolean;
  errMassage!: Observable<any>;
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.Data = {
      email: this.validateForm.value.email,
      password: this.validateForm.value.password,
    };
    console.log('change ');

    this.isLoading = true;
    this.store.dispatch(AuthActions.login({ user: this.Data }));
    setTimeout(() => {
      // this.errMassage = this.store.select(errorMassage);
      this.isLoading = false;
      this.errMassage = this.store.select(errorMassage);
    }, 3000);
  }
}
