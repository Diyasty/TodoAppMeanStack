import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/Todo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private _http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    return this._http.get<Todo[]>(`${environment.BASEURL}/todos/userTodos`);
  }

  AddTodo(todo: Todo): Observable<{ id: string }> {
    return this._http.post<{ id: string }>(
      `${environment.BASEURL}/todos/add`,
      todo
    );
  }
  removeTodo(todo: Todo): void {}
}
