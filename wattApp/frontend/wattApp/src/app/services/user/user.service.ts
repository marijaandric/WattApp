import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { url } from '../../app.module';
import { UserDTO } from '../../dtos/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = url + "/api/User/";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.baseUrl).pipe(
      map(users => {
        return users.map(user => new UserDTO(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.password,
          user.token,
          user.role
        ));
      })
    );
  }
}
