import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private loggedInUser: User | null = null;

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      tap(users => {
        if (users.length) {
          this.loggedInUser = users[0];
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  getUserId(): number | null {
    return this.loggedInUser && this.loggedInUser.id !== undefined ? this.loggedInUser.id : null;
  }

  logout(): void {
    this.loggedInUser = null;
  }
}