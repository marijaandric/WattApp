import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'http://localhost:5223/api/users';

  constructor(private http: HttpClient) { }

  //Get all users
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl);
  }

  addUser(user: User):Observable<User>{
    user.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<User>(this.baseUrl, user);
  }
  
  deleteUser(id:string):Observable<User>{
    return this.http.delete<User>(this.baseUrl + '/' + id);
  }

  updateUser(user: User): Observable<User>{
    return this.http.put<User>(this.baseUrl + '/' + user.id, user);
  }
}
