import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../Core/Entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User"

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateUser(user: User): Observable<User[]> {
    return this.http.put<User[]>(`${environment.apiUrl}/${this.url}`, user);
  }

  public createUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/${this.url}`, user);
  }

  public deleteUser(user: User): Observable<User[]> {
    return this.http.delete<User[]>(`${environment.apiUrl}/${this.url}/${user.id}`);
  }
}
