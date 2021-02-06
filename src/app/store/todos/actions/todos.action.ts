import { Todo } from './../../../models/Todo.model';
import { createAction, props } from '@ngrx/store';

const getAllTodos = createAction('[Todos Page] get all todos');

const AddTodo = createAction(
  '[Todos Page] Add Todo ',
  props<{ todos: Todo }>()
);
const UpdateTodo = createAction(
  '[Todos Page] Update Todo ',
  props<{ todo: Todo }>()
);
const DeleteTodo = createAction(
  '[Todos Page] Delete Todo ',
  props<{ id: number }>()
);

export const TodosActions = {
  getAllTodos,
  UpdateTodo,
  DeleteTodo,
  AddTodo,
};
