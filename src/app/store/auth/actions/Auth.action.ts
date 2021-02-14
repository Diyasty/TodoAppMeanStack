import { ResponseData } from './../../../models/response';
import { ILogin } from './../../../auth/auth.service';
import { User } from './../../../models/user.model';
import { createAction, props } from '@ngrx/store';
const login = createAction('[Login Page] Login', props<{ user: ILogin }>());
const loginSuccess = createAction(
  '[Login Page] login Success',
  props<{ user: ResponseData }>()
);
const loginError = createAction(
  '[Login Page] login Error',
  props<{ error: any }>()
);
const logout = createAction('[Login Page] logout');
const AutoLogin = createAction('[ Auto Login Page] Auto login ');

export const AuthActions = {
  login,
  loginSuccess,
  loginError,
  logout,
  AutoLogin,
};
