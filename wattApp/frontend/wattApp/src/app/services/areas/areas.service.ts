import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private baseUrl: string = url + "/api/Devices/";
  constructor(private http: HttpClient) { }

  getExtremeUsageForAreas(type:string, timeType:string, minmax:string)
  {
    return this.http.get<any>(this.baseUrl + "getExtremeUsageForAreas/" + type + "/" + timeType+ "/" + minmax);
  }
}
