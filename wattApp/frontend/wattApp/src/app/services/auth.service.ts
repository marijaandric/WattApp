import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { url } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = url+"/api/User/";
  constructor(private http:HttpClient, private router:Router) { }

  login(loginObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }

  logout()
  {
    localStorage.clear();
    //localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  storeToken(tokenValue:string)
  {
    localStorage.setItem("token",tokenValue);
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean
  {
    return !!localStorage.getItem('token');
  }
}
