import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  user: User | null;
  error: {
    message: string;
  };
}

export const AuthInitialState: AuthState = {
  user: null,
  error: {
    message: '',
  },
};

// const error = (state: AppState) => state.Auth;

const err = createFeatureSelector<AuthState>('Auth');

export const errorMassage = createSelector(
  err,
  (state: AuthState) => state.error.message
);
