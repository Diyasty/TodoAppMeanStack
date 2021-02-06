import { AuthState } from './../index';
import { AuthActions } from './../actions/Auth.action';
import { Action, createReducer, on } from '@ngrx/store';
import { AuthInitialState } from '..';

const AuthReducer = createReducer(
  AuthInitialState,
  on(AuthActions.login, () => AuthInitialState),
  on(AuthActions.loginSuccess, (state: any, action: any) => {
    return {
      ...state,
      user: {
        data: action.user,
        token: action.token,
      },
    };
  }),
  on(AuthActions.loginError, (state: any, action: any) => {
    console.log(action.error);

    return {
      ...state,
      error: action.error,
    };
  })
);

export function AUthReducer(state: any, action: Action) {
  return AuthReducer(state, action);
}
