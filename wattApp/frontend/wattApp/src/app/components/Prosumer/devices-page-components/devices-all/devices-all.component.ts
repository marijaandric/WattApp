import { Component } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { Router } from '@angular/router';
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

  constructor(private userService:UserService,
              private deviceService: DeviceService,
              private router: Router) { 
    if(this.token)
    {
      userService.GetUser(userService.getUserIdFromToken(this.token),this.token).subscribe((data) => {
        this.user = data;
      });
    }
  }

  NumberOfUserDevices: any;
  
  GetNumberOfUserDevices() {
    this.deviceService.GetNumberOfUserDevices(this.user.nameid).subscribe((response: any) => {
      this.NumberOfUserDevices=response;
      console.log(response);
    });
  }

  NumberOfActiveUserDevices: any;

  GetNumberOfActiveUserDevices() {
    this.deviceService.GetNumberOfActiveUserDevices(this.user.nameid).subscribe((response: any) => {
      this.NumberOfActiveUserDevices=response;
      console.log(response);
    });
  }

  NumberOfDevicesForUserThatDSOCanSee : any;

  GetNumberOfDevicesForUserThatDSOCanSee() {
    this.deviceService.GetNumberOfDevicesForUserThatDSOCanSee(this.user.nameid).subscribe((response: any) => {
      this.NumberOfDevicesForUserThatDSOCanSee=response;
      console.log(response);
    });
  }

  NumberOfDevicesForUserThatDSOCanManage : any;

  GetNumberOfDevicesForUserThatDSOCanManage() {
    this.deviceService.GetNumberOfDevicesForUserThatDSOCanManage(this.user.nameid).subscribe((response: any) => {
      this.NumberOfDevicesForUserThatDSOCanManage=response;
      console.log(response);
    });
  }

  ngOnInit() {
  this.GetNumberOfUserDevices();
  this.GetNumberOfActiveUserDevices();
  this.GetNumberOfDevicesForUserThatDSOCanSee();
  this.GetNumberOfDevicesForUserThatDSOCanManage();

    this.deviceService.getDevicesByUserId(this.user.nameid).subscribe((result: DeviceDTO[]) => {
      this.allDevices = result;
    });
  }
}
