import { Component, OnInit } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-devices-all',
  templateUrl: './devices-all.component.html',
  styleUrls: ['./devices-all.component.css']
})
export class DevicesAllComponent implements OnInit {
  allDevices: DeviceDTO[] = [];
  token = localStorage.getItem('token');
  id : any;
  user:any;
  loader=true;

  constructor(private userService:UserService,
              private deviceService: DeviceService,
              private router: Router) { 
    
    if(this.token)
    {
      this.id = this.userService.getUserIdFromToken(this.token);
      userService.GetUser(this.id,this.token).subscribe((data) => {
        this.user = data;
        this.ngOnInit()
      });
    }
  }

  NumberOfUserDevices: any;
  
  GetNumberOfUserDevices() {
    this.deviceService.GetNumberOfUserDevices(this.id).subscribe((response: any) => {
      this.NumberOfUserDevices=response;
    });
  }

  NumberOfActiveUserDevices: any;

  GetNumberOfActiveUserDevices() {
    this.deviceService.GetNumberOfActiveUserDevices(this.id).subscribe((response: any) => {
      this.NumberOfActiveUserDevices=response;
    });
  }

  NumberOfDevicesForUserThatDSOCanSee : any;

  GetNumberOfDevicesForUserThatDSOCanSee() {
    this.deviceService.GetNumberOfDevicesForUserThatDSOCanSee(this.id).subscribe((response: any) => {
      this.NumberOfDevicesForUserThatDSOCanSee=response;
    });
  }

  NumberOfDevicesForUserThatDSOCanManage : any;

  GetNumberOfDevicesForUserThatDSOCanManage() {
    this.deviceService.GetNumberOfDevicesForUserThatDSOCanManage(this.id).subscribe((response: any) => {
      this.NumberOfDevicesForUserThatDSOCanManage=response;
    });
  }

  ngOnInit() {
  this.GetNumberOfUserDevices();
  this.GetNumberOfActiveUserDevices();
  this.GetNumberOfDevicesForUserThatDSOCanSee();
  this.GetNumberOfDevicesForUserThatDSOCanManage();

    this.deviceService.getDevicesByUserId(this.id).subscribe((result: DeviceDTO[]) => {
      this.loader = false;
      this.allDevices = result;
    });
  }
}
