import { AppState } from './../../app-store.module';
import { TodosActions } from './../actions/todos.action';
import { TodosInitialState, TodosState, todoAdapter } from './../index';
import { Action, createReducer, on, State } from '@ngrx/store';

const TodosReduceR = createReducer(
  TodosInitialState,
  on(TodosActions.getAllTodos, (state) => {
    console.log(state);

    return {
      ...state,
    };
  }),
  // on(TodosActions.getTodoByID, (state, action) => {
  //   return {
  //     ...state,
  //     todo: state.todos.filter((todo) => todo.id === action.id),
  //   };
  // }),

  on(TodosActions.AddTodo, (state, action) => {
    return todoAdapter.addOne(action.todo, state);
  }),
  on(TodosActions.UpdateTodo, (state, action) => {
    return todoAdapter.updateOne(action.todo, state);
  }),
  on(TodosActions.DeleteTodo, (state, action) => {
    return todoAdapter.removeOne(action.id, state);
  })
);
export function TodosReducer(state: any, action: Action) {
  return TodosReduceR(state, action);
}
