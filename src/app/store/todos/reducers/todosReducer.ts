import { AppState } from './../../app-store.module';
import { TodosActions } from './../actions/todos.action';
import { TodosInitialState, TodosState } from './../index';
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
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          title: action.todos.title,
          description: action.todos.description,
        },
      ],
    };
  }),
  on(TodosActions.UpdateTodo, (state, action) => {
    const UpdatedTodo = state.todos.map((todo) =>
      action.todo.id === todo.id ? action.todo : todo
    );
    return {
      ...state,
      todos: UpdatedTodo,
    };
  }),
  on(TodosActions.DeleteTodo, (state, action) => {
    const UpdatedTodo = state.todos.filter((todo) => todo.id != action.id);
    return {
      ...state,
      todos: UpdatedTodo,
    };
  })
);
export function TodosReducer(state: any, action: Action) {
  return TodosReduceR(state, action);
}
