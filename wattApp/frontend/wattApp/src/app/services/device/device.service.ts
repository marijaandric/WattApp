import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { url } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private baseUrl: string = url + "/api/Devices/";

  constructor(private http: HttpClient) { }

  getAllDevices(): Observable<DeviceDTO[]>{
    return this.http.get<DeviceDTO[]>(this.baseUrl).pipe(
      map(devices => {
        return devices.map(device => new DeviceDTO(
          device.id,
          device.deviceId,
          device.userId,
          device.deviceName,
          device.room,
          device.deviceType
        ));
      })
    );
  }

  getDevicesByType(type: string): Observable<DeviceDTO[]>{
    return this.http.get<DeviceDTO[]>(this.baseUrl + "type/" + type).pipe(
      map(devices => {
        return devices.map(device => new DeviceDTO(
          device.id,
          device.deviceId,
          device.userId,
          device.deviceName,
          device.room,
          device.deviceType
        ));
      })
    );
  }

  getDeviceById(id: string): Observable<DeviceDTO>{
    return this.http.get<DeviceDTO>(this.baseUrl + "device/" + id);
  }

  AddDevice(deviceObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}`,deviceObj);
  }

  deleteDevice(deviceId: number) {
    return this.http.delete(this.baseUrl + deviceId);
  }

  devicesPerRooms(deviceId : number, type : string, number : number)
  {
    return this.http.get<any>(this.baseUrl + "chart/" + deviceId + "/" + type+ "/" + number);
  }

  getBiggest(deviceId: number,year: number,month: number,day: number,consumer: string,max: string)
  {
    return this.http.get<any>(this.baseUrl + deviceId + "/" + year+ "/" + month+ "/" + day+ "/" + consumer+ "/" + max);
  }

  getmonth(deviceId: number,year: number,month: number,consumer: string)
  {
    return this.http.get<any>(this.baseUrl+ deviceId + "/" + year+ "/" + month+ "/" + consumer+ "/" );
  }

  getmonthDSO(type: string)
  {
    return this.http.get<any>(this.baseUrl + "currentMonthAllUsersDevicesUsage" +"/"+ type);
  } 

  getprice()
  {
    return this.http.get<any>(this.baseUrl + "price");
  }

}
