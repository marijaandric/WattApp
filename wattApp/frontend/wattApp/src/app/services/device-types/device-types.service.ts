import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypesService {
  private baseUrl: string = url + "/api/DeviceTypes/";

  constructor(private http: HttpClient) { } 

  getAllDeviceTypes(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(this.baseUrl);
  }

}
