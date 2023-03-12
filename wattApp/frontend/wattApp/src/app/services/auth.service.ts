import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = url+"/api/User/";
  constructor(private http:HttpClient) { }

  login(loginObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }
}
