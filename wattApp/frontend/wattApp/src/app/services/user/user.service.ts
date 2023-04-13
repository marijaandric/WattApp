import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { url } from '../../app.module';
import { UserDTO } from '../../dtos/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = url + "/api/User/";

  constructor(private http: HttpClient,private jwtHelper:JwtHelperService) { }

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
          user.address,
          user.role,
          user.x,
          user.y,
          user.area
        ));
      })
    );
  }

  GetUser(userId: number, token: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(`${this.baseUrl}/${userId}`, { headers });
  }

  GetUserWithoutToken(userId: number) {
    return this.http.get(`${this.baseUrl}${userId}`);
  }

  getUserIdFromToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.nameid;
  }

  getUserRoleFromToken(token: string)
  {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.role;
  }

  PutUser(id : number,user : any): Observable<any>
  {
    const url = this.baseUrl+`/${id}`;
    return this.http.put(url,user);
  }
  
  getUsersPaginationByRole(type:string, page:number,limit:number): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.baseUrl+"getUsersPaginationByRole/"+type+"/"+page+"/"+limit).pipe(
      map(users => {
        return users.map(user => new UserDTO(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.password,
          user.token,
          user.address,
          user.role,
          user.x,
          user.y,
          user.area
        ));
      })
    );
  }


}
