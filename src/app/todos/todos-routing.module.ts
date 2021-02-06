import { AddTodoComponent } from './add-todo/add-todo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosComponent } from './todos.component';

const routes: Routes = [
  { path: '', component: TodosComponent, pathMatch: 'full' },
  {
    path: 'add',
    component: AddTodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
