import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../app.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = url+"/api/User";

  constructor(private http: HttpClient, private jwtHelper:JwtHelperService) { }

  GetUser(userId: number, token: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(`${this.baseUrl}/${userId}`, { headers });
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

  
}
