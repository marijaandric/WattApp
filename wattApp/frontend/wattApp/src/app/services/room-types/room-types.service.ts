import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class RoomTypesService {
  private baseUrl: string = url + "/api/RoomTypes/";

  constructor(private http: HttpClient) { } 

  getAllRoomTypes(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(this.baseUrl);
  }
  
}
