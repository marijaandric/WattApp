import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/app.module';
import { DeviceDataDTO } from 'src/app/dtos/DeviceDataDTO';

@Injectable({
  providedIn: 'root'
})
export class DeviceDataService {
  private baseUrl: string = url + "/api/DevicesDatas/";

  constructor(private http: HttpClient) { }

  // getDeviceData(id: number): Observable<DeviceDataDTO>{
  //   return this.http.get<DeviceDataDTO>(this.baseUrl + id);
  // }

  // getHistoryAndForecastByDayForAllDevices()
  // {
  //   return this.http.get<DeviceDataDTO>(this.baseUrl + "getHistoryAndForecastByDayForAllDevices");
  // }
  powerUsage(id: number,year:number,month:number,day:number,time:number)
   {
    return this.http.get<DeviceDataDTO>(this.baseUrl + id +"/"+year +"/"+month +"/"+day +"/"+time);
   }
}
