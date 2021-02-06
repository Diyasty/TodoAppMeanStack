import { createSelector } from '@ngrx/store';
import { AppState } from '../app-store.module';
import { Todo } from './../../models/Todo.model';

export interface TodosState {
  todos: Todo[];
}

export const TodosInitialState: TodosState = {
  todos: [],
};

export const todosFeature = (state: AppState) => state.todos;

export const TODOS = createSelector(
  todosFeature,
  (state: TodosState) => state.todos
);
