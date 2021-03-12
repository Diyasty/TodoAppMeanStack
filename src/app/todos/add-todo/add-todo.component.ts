import { TodosActions } from './../../store/todos/actions/todos.action';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Todo } from 'src/app/models/Todo.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private http: HttpClient,
    private store: Store
  ) {}
  validateForm!: FormGroup;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  submitForm() {
    const todo: Todo = {
      title: this.validateForm.value.title,
      description: this.validateForm.value.description,
    };
    this.store.dispatch(TodosActions.AddTodo({ todo: todo }));
    // this.http.post(`${environment.BASEURL}/todos/add`, todo).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
    this.validateForm.reset();
    this._router.navigate(['/todos']);
  }
}
