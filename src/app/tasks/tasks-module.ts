import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskList } from './task-list/task-list';
import { TaskForm } from './task-form/task-form';



@NgModule({
  declarations: [
    TaskList,
    TaskForm
  ],
imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: TaskList }
    ])
  ]
})
export class TasksModule { }
