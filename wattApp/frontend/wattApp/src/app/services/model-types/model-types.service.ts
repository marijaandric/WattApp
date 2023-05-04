import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class ModelTypesService {
  private baseUrl: string = url + "/api/ModelTypes/";

  constructor(private http: HttpClient) { } 

  getAllModelTypes(deviceType: string): Observable<{ [key: number]: string }> {
    return this.http.get<{ [key: number]: string }>(`${this.baseUrl}${deviceType}`);
  }
  
}
