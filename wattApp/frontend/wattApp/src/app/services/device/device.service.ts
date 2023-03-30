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

}
