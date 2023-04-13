import { Component } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-devices-all',
  templateUrl: './devices-all.component.html',
  styleUrls: ['./devices-all.component.css']
})
export class DevicesAllComponent {
  allDevices: DeviceDTO[] = [];
  token = localStorage.getItem('token');
  user:any;

  constructor(private userService:UserService,private deviceService: DeviceService) { 
    if(this.token)
    {
      userService.GetUser(userService.getUserIdFromToken(this.token),this.token).subscribe((data) => {
        this.user = data;
      });
    }
  }

  NumberOfUserDevices: any;
  
  GetNumberOfUserDevices() {
    //const deviceId = this.user.id ;
    const deviceId = 1;
    this.deviceService.GetNumberOfUserDevices(deviceId).subscribe((response: any) => {
      this.NumberOfUserDevices=response;
      console.log(response);
    });
  }

  NumberOfActiveUserDevices: any;

  GetNumberOfActiveUserDevices() {
    //const deviceId = this.user.id ;
    const deviceId = 1;
    this.deviceService.GetNumberOfActiveUserDevices(deviceId).subscribe((response: any) => {
      this.NumberOfActiveUserDevices=response;
      console.log(response);
    });
  }

  NumberOfDevicesForUserThatDSOCanSee : any;

  GetNumberOfDevicesForUserThatDSOCanSee() {
    //const deviceId = this.user.id ;
    const deviceId = 1;
    this.deviceService.GetNumberOfDevicesForUserThatDSOCanSee(deviceId).subscribe((response: any) => {
      this.NumberOfDevicesForUserThatDSOCanSee=response;
      console.log(response);
    });
  }

  NumberOfDevicesForUserThatDSOCanManage : any;

  GetNumberOfDevicesForUserThatDSOCanManage() {
    //const deviceId = this.user.id ;
    const deviceId = 1;
    this.deviceService.GetNumberOfDevicesForUserThatDSOCanManage(deviceId).subscribe((response: any) => {
      this.NumberOfDevicesForUserThatDSOCanManage=response;
      console.log(response);
    });
  }

  ngOnInit() {
  this.GetNumberOfUserDevices();
  this.GetNumberOfActiveUserDevices();
  this.GetNumberOfDevicesForUserThatDSOCanSee();
  this.GetNumberOfDevicesForUserThatDSOCanManage();

    this.deviceService.getAllDevices().subscribe((result: DeviceDTO[]) => {
      this.allDevices = result;
    });
  }
}
