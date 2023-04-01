import { Component, Input, OnInit } from '@angular/core';
import { StadardTemplateComponent } from 'src/app/components/global/layout-components/standard-template/stadard-template.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';

@Component({
  selector: 'app-prosumerhome',
  templateUrl: './prosumerhome.component.html',
  styleUrls: ['./prosumerhome.component.css']
})
export class ProsumerhomeComponent implements OnInit{
  user:any;
  token = localStorage.getItem('token');
  devices: any[] = [];

  @Input() device:any={id:1,deviceName: "device", deviceType:"Consumer",power: 10}
  @Input() device1:any={id:1,deviceName: "device", deviceType:"Producer",power: 10}
  @Input() device2:any={id:1,deviceName: "device", deviceType:"Storage",power: 10}

  constructor(private userService:UserService,private http: HttpClient,private deviceService : DeviceService)
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


    this.deviceService.getBiggest(deviceId,year,month,day,consumer,max).subscribe((response: any) => {
       this.IdBiggestConsumer=response.deviceId;
       this.NameBiggestConsumer=response.deviceName;
       this.PowerUsageBiggestConsumer=response.averagePowerUsage.toFixed(2);
       this.device.deviceName = this.NameBiggestConsumer;
       this.device.id=this.IdBiggestConsumer;
       this.device.power=this.PowerUsageBiggestConsumer;
       this.device.deviceType="Consumer";
     //console.log(response);
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

    this.deviceService.getBiggest(deviceId,year,month,day,consumer,max).subscribe((response: any) => {
       this.IdBiggestProducer=response.deviceId;
       this.NameBiggestProducer=response.deviceName;
       this.PowerUsageBiggestProducer=response.averagePowerUsage.toFixed(2);
       this.device1.deviceName = this.NameBiggestProducer;
       this.device1.id=this.IdBiggestProducer;
       this.device1.power=this.PowerUsageBiggestProducer;
       this.device1.deviceType="Producer";
     //console.log(response);
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


    this.deviceService.getBiggest(deviceId,year,month,day,consumer,max).subscribe((response: any) => {
       this.IdBiggestStorage=response.deviceId;
       this.NameBiggestStorage=response.deviceName;
       this.PowerUsageBiggestStorage=response.averagePowerUsage.toFixed(2);
       this.device2.deviceName = this.NameBiggestStorage;
       this.device2.id=this.IdBiggestStorage;
       this.device2.power=this.PowerUsageBiggestStorage;
       this.device2.deviceType="Storage";
     //console.log(response);
    });
  
  }




  monthPowerUsageConsumer: any;
  
  getmonthPowerUsageConsume() {
    const deviceId = 1 ;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Consumer';
;

  this.deviceService.getmonth(deviceId,year,month,consumer).subscribe((response: any) => {
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


    this.deviceService.getmonth(deviceId,year,month,consumer).subscribe((response: any) => {
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

    this.deviceService.getmonth(deviceId,year,month,consumer).subscribe((response: any) => {
      this.monthPowerUsageStorage=response.toFixed(2);
    });
  
  }

  dayPowerPrice: any;
  
  getdayPowerPrice() {
  
    this.deviceService.getprice().subscribe((response: any) => {
      this.dayPowerPrice=response.toFixed(2);
    });
  
  }


  ngOnInit(): void {
    this.devices.push(this.device);
    this.devices.push(this.device1);
    this.devices.push(this.device2);
    this.getBiggestConsumer();
    this.getBiggestProducer();
    this.getBiggestStorage();
    this.getmonthPowerUsageConsume();
    this.getmonthPowerUsageProducer();
    this.getmonthPowerUsageStorage();
    this.getdayPowerPrice();

    
  }

  

}
