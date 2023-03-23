import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  WeatherData:any;
  private baseUrl = url+"/api/User";
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }

  
}
