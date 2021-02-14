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
    console.log('inservise');
    return this._http.get<Todo[]>(`${environment.BASEURL}/todos/userTodos`);
  }

  AddTodo(todo: Todo): Observable<Todo> {
    return this._http.post<Todo>(`${environment.BASEURL}/todos/add`, todo);
  }
}
