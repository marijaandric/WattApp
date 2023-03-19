import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { deviceFakerUrl } from 'src/app/app.module';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private baseUrl: string = deviceFakerUrl + "/api/Devices/";

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

}
