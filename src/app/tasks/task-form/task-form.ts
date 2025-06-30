import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task';
import { TaskTable } from '../../models/task';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  taskForm: FormGroup;
  @Input() taskToEdit: TaskTable | null = null;
  @Output() taskAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private taskService: Task) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnChanges(): void {
    if (this.taskToEdit) {
      this.taskForm.patchValue({
        title: this.taskToEdit.title,
        description: this.taskToEdit.description
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: TaskTable = {
        ...this.taskForm.value,
        completed: this.taskToEdit ? this.taskToEdit.completed : false
      };
      if (this.taskToEdit && this.taskToEdit.id) {
        task.id = this.taskToEdit.id;
        this.taskService.updateTask(task).subscribe(() => {
          this.taskAdded.emit();
          this.resetForm();
        });
      } else {
        this.taskService.addTask(task).subscribe(() => {
          this.taskAdded.emit();
          this.resetForm();
        });
      }
    }
  }

  resetForm(): void {
    this.taskForm.reset();
    this.taskToEdit = null;
  }
}
