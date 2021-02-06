import { TodosState } from './todos/index';
import { TodosReducer } from './todos/reducers/todosReducer';
import { AuthState } from './auth/index';
import { Todo } from './../models/Todo.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AUthReducer } from './auth/reducer/Auth.reducer';

export interface AppState {
  Auth: AuthState;
  todos: TodosState;
}

const reducers: ActionReducerMap<AppState> = {
  Auth: AUthReducer,
  todos: TodosReducer,
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
})
export class AppStoreModule {}
