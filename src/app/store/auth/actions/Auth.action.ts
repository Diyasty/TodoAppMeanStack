import { User } from './../../../models/user.model';
import { createAction, props } from '@ngrx/store';
const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);
const loginSuccess = createAction(
  '[Login Page] login Success',
  props<{ user: User; token: string }>()
);
const loginError = createAction(
  '[Login Page] login Error',
  props<{ error: string }>()
);

export const AuthActions = {
  login,
  loginSuccess,
  loginError,
};
