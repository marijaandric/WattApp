import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TokenApi } from 'src/app/models/token-api.model';
import { url } from '../../app.module';
import { ResetPassword } from 'src/app/models/reset-password.model';

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

  storeRefreshToken(tokenValue:string)
  {
    localStorage.setItem("refreshToken",tokenValue);
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  getRefreshToken()
  {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn():boolean
  {
    return !!localStorage.getItem('token');
  }

  signUp(userObj : any)
  {
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  renewTooken(tokenApi:TokenApi)
  {
    return this.http.post<any>(`${this.baseUrl}refresh`,tokenApi)
  }

  sendResetPasswordLink(email:string)
  {
    return this.http.post<any>(`${this.baseUrl}send-reset-email/${email}`,{});
  }

  resetPassword(ressetPasswordObj:ResetPassword)
  {
    return this.http.post<any>(`${this.baseUrl}reset-email`,ressetPasswordObj);
  }

}
