import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskTable } from '../models/task';
import { AuthService } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class Task {
private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTasks(): Observable<TaskTable[]> {
    const userId = this.authService.getUserId();
    return this.http.get<TaskTable[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addTask(task: TaskTable): Observable<TaskTable> {
    task.userId = this.authService.getUserId()!;
    return this.http.post<TaskTable>(this.apiUrl, task);
  }

  updateTask(task: TaskTable): Observable<TaskTable> {
    return this.http.put<TaskTable>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
