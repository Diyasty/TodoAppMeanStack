import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  user: User | null;
  error: {
    message: any;
  };
}

export const AuthInitialState: AuthState = {
  user: null,
  error: {
    message: null,
  },
};

// const error = (state: AppState) => state.Auth;

const err = createFeatureSelector<AuthState>('Auth');

export const errorMassage = createSelector(
  err,
  (state: AuthState) => state.error.message
);

export const isAuthenticated = createSelector(err, (state: AuthState) =>
  state.user ? true : false
);
export const AuthToken = createSelector(err, (state: AuthState) =>
  state.user ? state.user.token : false
);
