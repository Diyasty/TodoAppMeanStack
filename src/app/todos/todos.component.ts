import { Todo } from './../models/Todo.model';
import { TodosActions } from './../store/todos/actions/todos.action';
import { AppState } from './../store/app-store.module';
import { AuthService } from './../auth/auth.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { TODOS } from '../store/todos';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  listOfData$!: Observable<Todo[]>;
  User$!: Observable<boolean>;
  title: any;
  description: any;
  id!: any;
  status!: any;
  constructor(
    private fb: FormBuilder,
    private readonly store: Store<AppState>,
    private http: HttpClient,
    private Auth: AuthService,
    private modal: NzModalService
  ) {}

  validateForm!: FormGroup;
  true = true;
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.listOfData$ = this.store.select(TODOS);
  }

  submitForm(title: string, description: string) {}
  isVisibleTop = false;
  isVisibleMiddle = false;

  isVisible = false;
  isOkLoading = false;

  error(id: number): void {
    this.modal.error({
      nzTitle: 'Delete Todo ',
      nzContent: 'Are You Sure ??? ',
      nzOnOk: () => this.onDelete(id),
    });
  }

  onDelete(id: number) {
    console.log(id);
    this.store.dispatch(TodosActions.DeleteTodo({ id }));
    // const todo = this.listOfData$.pipe(
    //   map((res) => {
    //     // res.filter((x) => x.id != id);
    //   })
    // );
  }
  showModal(todo: Todo) {
    this.isVisible = true;

    this.title = todo.title;
    this.description = todo.description;
    this.id = todo.id;
    this.status = todo.status;
    console.log(todo.id);

    // const todo: Todo = {
    //   id: id,
    //   title: this.title,
    //   description: this.description,
    // };

    // this.listOfData$.pipe(
    //   map((res) => {

    //     // let todo = res.find((x) => x.id === id);
    //     // this.title = todo?.title;
    //     // this.description = todo?.description;
    //     // this.status = todo?.status;
    //     // this.id = id;
    //   })
    // );
  }

  handleOk(): void {
    const todo: Todo = {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
    };
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }
  handleCancel(): void {
    this.isVisible = false;
  }
}
