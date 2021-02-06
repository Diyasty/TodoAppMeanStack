import { NgZorroAntdModule } from './../ng-zorro-antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTodoComponent } from './add-todo/add-todo.component';

@NgModule({
  declarations: [TodosComponent, AddTodoComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class TodosModule {}
