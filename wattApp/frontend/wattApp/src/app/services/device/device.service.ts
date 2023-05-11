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
          device.userId,
          device.deviceName,
          device.deviceModel,
          device.room,
          device.deviceType,
          device.isActive,
          device.allowOperatorControll,
          device.allowOperatorVisibility,
          device.imageId
        ));
      })
    );
  }

  getDevicesByType(type: string): Observable<DeviceDTO[]>{
    return this.http.get<DeviceDTO[]>(this.baseUrl + "type/" + type).pipe(
      map(devices => {
        return devices.map(device => new DeviceDTO(
          device.id,
          device.userId,
          device.deviceName,
          device.deviceModel,
          device.room,
          device.deviceType,
          device.isActive,
          device.allowOperatorControll,
          device.allowOperatorVisibility,
          device.imageId
        ));
      })
    );
  }

  getDeviceById(id: any): Observable<DeviceDTO>{
    return this.http.get<DeviceDTO>(this.baseUrl + "device/" + id);
  }

  getDevicesByUserId(id: number){
    return this.http.get<any>(this.baseUrl + id);
  }

  getDevicesForUserByType(userId: number, deviceType: string){
    return this.http.get<any>(this.baseUrl + "user/" + userId + "/type/" + deviceType);
  }

  AddDevice(deviceObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}`,deviceObj);
  }

  deleteDevice(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  devicesPerRooms(id : number, type : string, number : number)
  {
    return this.http.get<any>(this.baseUrl + "chart/" + id + "/" + type+ "/" + number);
  }

  getBiggest(id: number,year: number,month: number,day: number,consumer: string,max: string)
  {
    return this.http.get<any>(this.baseUrl + id + "/" + year+ "/" + month+ "/" + day+ "/" + consumer+ "/" + max);
  }

  getmonth(id: number,year: number,month: number,consumer: string)
  {
    return this.http.get<any>(this.baseUrl+ id + "/" + year+ "/" + month+ "/" + consumer+ "/" );
  }

  getmonthDSO(type: string)
  {
    return this.http.get<any>(this.baseUrl + "currentMonthAllUsersDevicesUsage" +"/"+ type);
  } 

  getprice()
  {
    return this.http.get<any>(this.baseUrl + "price");
  }

  updateDevice(device: DeviceDTO): Observable<DeviceDTO>{
    return this.http.put<DeviceDTO>(this.baseUrl + device.id, device);
  }

  updateUserDSODevice(device:any, id:number)
  {
    return this.http.put<DeviceDTO>(this.baseUrl + device.id, device);
  }

  getHistoryAndForecastByDayForDevice(id :number, type:string)
  {
    return this.http.get<any>(this.baseUrl+"getHistoryAndForecastByDayForDevice/"+id+"/"+type)
  }

  GetNumberOfUserDevices(id :number)
  {
    return this.http.get<any>(this.baseUrl+"getNumberOfUserDevices"+"/"+id)
  }
  GetNumberOfActiveUserDevices(id :number)
  {
    return this.http.get<any>(this.baseUrl+"getNumberOfActiveUserDevices"+"/"+id)
  }
  GetNumberOfDevicesForUserThatDSOCanSee(id :number)
  {
    return this.http.get<any>(this.baseUrl+"GetNumberOfDevicesForUserThatDSOCanSee"+"/"+id)
  }
  GetNumberOfDevicesForUserThatDSOCanManage(id :number)
  {
    return this.http.get<any>(this.baseUrl+"GetNumberOfDevicesForUserThatDSOCanManage"+"/"+id)
  }
  GetHistoryAndForecastByDayForAllUserDevices(id :number,type: string)
  {
    return this.http.get<any>(this.baseUrl+"getHistoryAndForecastByDayForAllUserDevices"+"/"+id+"/"+type)
  }
  GetHistoryAndForecastByDayForAllDevices(type: string)
  {
    return this.http.get<any>(this.baseUrl+"getHistoryAndForecastByDayForAllDevices"+"/"+type)
  }

  GetUserDevicesVisibleForDSO(id:number)
  {
    return this.http.get<any>(this.baseUrl+"getUserDevicesVisibleForDSO/"+id)
  }

  getDeviceComparison(id:number)
  {
    return this.http.get<any>(this.baseUrl+"GetNumberOfDevicesByType/"+id)
  }

  getUsage(id: number,time: string)
  {
    return this.http.get<any>(this.baseUrl+ "getPowerUsageOfDeviceForGivenTime" + "/" + id+ "/" + time);
  }
  getMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType(deviceType: string, timeType:string)
  {
    return this.http.get<any>(this.baseUrl+ "getMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType" + "/" + deviceType+ "/" + timeType);
  }
  getMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType(id: number, deviceType: string, timeType:string)
  {
    return this.http.get<any>(this.baseUrl+ "getMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType" + "/" + id +"/"+deviceType+ "/" + timeType);
  }
  getMaxMinAvgTotalPowerUsageByTimeForDevice(id: number,timeType:string)
  {
    return this.http.get<any>(this.baseUrl+ "getMaxMinAvgTotalPowerUsageByTimeForDevice" + "/" + id +"/"+ timeType);
  }
  getPowerUsageForAllTypesForArea(area:string,timeType:string)
  {
    return this.http.get<any>(this.baseUrl+ "getPowerUsageForAllTypesForArea" + "/" + area +"/"+ timeType);
  }
  getChartArea(Type:string,broj: number)
  {
    return this.http.get<any>(this.baseUrl+ "getChartArea" + "/" + Type +"/"+ broj);
  }



}
