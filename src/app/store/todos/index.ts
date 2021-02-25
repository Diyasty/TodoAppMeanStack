import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { AppState } from '../app-store.module';
import { Todo } from './../../models/Todo.model';

export interface TodosState extends EntityState<Todo> {
  selectedUserId: number | null;
}

export const todoAdapter = createEntityAdapter<Todo>();

export const TodosInitialState: TodosState = todoAdapter.getInitialState({
  selectedUserId: null,
});
// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = todoAdapter.getSelectors();

export const todosFeature = (state: AppState) => state.todos;

export const TODOS = createSelector(todosFeature, selectAll);
