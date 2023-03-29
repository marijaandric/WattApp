import { Component, Input, OnInit } from '@angular/core';
import { StadardTemplateComponent } from 'src/app/components/global/layout-components/standard-template/stadard-template.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';

@Component({
  selector: 'app-prosumerhome',
  templateUrl: './prosumerhome.component.html',
  styleUrls: ['./prosumerhome.component.css']
})
export class ProsumerhomeComponent implements OnInit{
  user:any;
  token = localStorage.getItem('token');
  @Input() device:any={id:1,deviceName:"ime", deviceType:"prezime"}
  @Input() device2:any={id:2,deviceName:"ime", deviceType:"prezime"}
  devices: any[] = [];

  constructor(private userService:UserService,private http: HttpClient)
  {
    if(this.token)
    {
      userService.GetUser(userService.getUserIdFromToken(this.token),this.token).subscribe((data) => {
        this.user = data;
      });
    }
    
  }
  IdBiggestConsumer: any;
  NameBiggestConsumer: any;
  PowerUsageBiggestConsumer : any;

  


  getBiggestConsumer() {
    const deviceId = 1 ;
   // const deviceId = this.user.id ;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Consumer';
    const max = 'max';

    const url = `https://localhost:7158/api/Devices/${deviceId}/${year}/${month}/${day}/${consumer}/${max}`;

    this.http.get(url).subscribe((response: any) => {
       this.IdBiggestConsumer=response.deviceId;
       this.NameBiggestConsumer=response.deviceName;
       this.PowerUsageBiggestConsumer=response.averagePowerUsage.toFixed(3);
    // console.log(response);
    });
  
  }

  IdBiggestProducer: any;
  NameBiggestProducer: any;
  PowerUsageBiggestProducer : any;
  


  getBiggestProducer() {
    const deviceId = 1 ;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Producer';
    const max = 'max';

    const url = `https://localhost:7158/api/Devices/${deviceId}/${year}/${month}/${day}/${consumer}/${max}`;

    this.http.get(url).subscribe((response: any) => {
       this.IdBiggestProducer=response.deviceId;
       this.NameBiggestProducer=response.deviceName;
       this.PowerUsageBiggestProducer=response.averagePowerUsage;
    });
  
  }
  IdBiggestStorage: any;
  NameBiggestStorage: any;
  PowerUsageBiggestStorage: any;
  


  getBiggestStorage() {
    const deviceId = 1 ;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Storage';
    const max = 'max';

    const url = `https://localhost:7158/api/Devices/${deviceId}/${year}/${month}/${day}/${consumer}/${max}`;

    this.http.get(url).subscribe((response: any) => {
       this.IdBiggestStorage=response.deviceId;
       this.NameBiggestStorage=response.deviceName;
       this.PowerUsageBiggestStorage=response.averagePowerUsage;
    });
  
  }

  monthPowerUsageConsumer: any;
  
  getmonthPowerUsageConsume() {
    const deviceId = 1 ;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Consumer';

    const url = `https://localhost:7158/api/Devices/${deviceId}/${year}/${month}/${consumer}`;

    this.http.get(url).subscribe((response: any) => {
      this.monthPowerUsageConsumer=response.toFixed(2);
    });
  
  }

  monthPowerUsageProducer: any;
  
  getmonthPowerUsageProducer() {
    const deviceId = 1 ;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Producer';

    const url = `https://localhost:7158/api/Devices/${deviceId}/${year}/${month}/${consumer}`;

    this.http.get(url).subscribe((response: any) => {
      this.monthPowerUsageProducer=response.toFixed(2);
    });
  
  }

  monthPowerUsageStorage: any;
  
  getmonthPowerUsageStorage() {
    const deviceId = 1 ;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Storage';

    const url = `https://localhost:7158/api/Devices/${deviceId}/${year}/${month}/${consumer}`;

    this.http.get(url).subscribe((response: any) => {
      this.monthPowerUsageStorage=response.toFixed(2);
    });
  
  }

  dayPowerPrice: any;
  
  getdayPowerPrice() {
   

    const url = `https://localhost:7158/api/Devices/price`;

    this.http.get(url).subscribe((response: any) => {
      this.dayPowerPrice=response.toFixed(2);
    });
  
  }


  ngOnInit(): void {
    this.getBiggestConsumer();
    this.getBiggestProducer();
    this.getBiggestStorage();
    this.getmonthPowerUsageConsume();
    this.getmonthPowerUsageProducer();
    this.getmonthPowerUsageStorage();
    this.getdayPowerPrice();
    this.devices.push(this.device);
    this.devices.push(this.device);
  }
  

}
