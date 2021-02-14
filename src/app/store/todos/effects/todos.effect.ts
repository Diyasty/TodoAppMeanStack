import { exhaustMap, map } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TodosService } from '../../../todos/services/todos.service';
import { Injectable } from '@angular/core';
import { TodosActions } from '../actions/todos.action';

@Injectable()
export class TodosEffect {
  constructor(private todosService: TodosService, private action$: Actions) {}

  getAll = createEffect(
    () => {
      return this.action$.pipe(
        ofType(TodosActions.getAllTodos),
        exhaustMap((action) => {
          return this.todosService.getAllTodos().pipe(
            map((data) => {
              console.log(data);
            })
          );
        })
      );
    },
    {
      dispatch: false,
    }
  );
}
