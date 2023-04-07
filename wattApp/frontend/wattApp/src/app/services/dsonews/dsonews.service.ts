import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { url } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class DsonewsService {

  private baseUrl: string = url + "/api/DsoNews/";

  constructor(private http: HttpClient) { }

  getnew()
  {
    return this.http.get<any>(this.baseUrl);
  }

  AddNews(NewObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}`,NewObj);
  }

}