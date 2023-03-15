import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = url+"/api/User";

  constructor(private http: HttpClient) { }

  getUserProfile(userId: string, token: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(`${this.baseUrl}/${userId}`, { headers });
  }

}
