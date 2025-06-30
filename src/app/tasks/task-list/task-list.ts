import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { TaskTable } from '../../models/task';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
tasks: TaskTable[] = [];
taskToEdit: TaskTable | null = null;
  @Output() editTask = new EventEmitter<TaskTable>();

  constructor(private taskService: Task) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }  

  toggleTask(task: TaskTable): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  onEdit(task: TaskTable): void {
    this.taskToEdit = task;
    this.editTask.emit(task);
  }
}
