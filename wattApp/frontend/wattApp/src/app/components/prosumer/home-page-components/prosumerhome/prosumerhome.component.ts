import { Component, Input, OnInit } from '@angular/core';
import { StadardTemplateComponent } from 'src/app/components/global/layout-components/standard-template/stadard-template.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';

@Component({
  selector: 'app-prosumerhome',
  templateUrl: './prosumerhome.component.html',
  styleUrls: ['./prosumerhome.component.css']
})
export class ProsumerhomeComponent implements OnInit{
  user:any;
  token = localStorage.getItem('token');
  devices: any[] = [];
  quote:string = "It's great to see you here! Thanks for joining us."
  quotes :string[] = ["It's great to see you here! Thanks for joining us.","We've been waiting for you! Welcome to our website.",
"Welcome to our online family! We can't wait to get to know you better.","Thanks for stopping by! We hope you enjoy your time on our page.",
"Welcome to our virtual home. Feel free to make yourself comfortable.","A warm welcome to you! We hope our page is just what you're looking for.",
"We're honored to have you as our guest. "];

  @Input() device:any={id:1,deviceName: "device", deviceType:"Consumer",power: 10}
  @Input() device1:any={id:1,deviceName: "device", deviceType:"Producer",power: 10}
  @Input() device2:any={id:1,deviceName: "device", deviceType:"Stock",power: 10}

  constructor(private userService:UserService,private http: HttpClient,private deviceService : DeviceService,private dsonew : DsonewsService)
  {
    this.quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
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
    const id = 1 ;
   // const deviceId = this.user.id ;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Consumer';
    const max = 'max';


    this.deviceService.getBiggest(id,year,month,day,consumer,max).subscribe((response: any) => {
       this.IdBiggestConsumer=response.id;
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
    const id = 1 ;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Producer';
    const max = 'max';

    this.deviceService.getBiggest(id,year,month,day,consumer,max).subscribe((response: any) => {
       this.IdBiggestProducer=response.id;
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
    const id = 1 ;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Stock';
    const max = 'max';


    this.deviceService.getBiggest(id,year,month,day,consumer,max).subscribe((response: any) => {
       this.IdBiggestStorage=response.id;
       this.NameBiggestStorage=response.deviceName;
       this.PowerUsageBiggestStorage=response.averagePowerUsage.toFixed(2);
       this.device2.deviceName = this.NameBiggestStorage;
       this.device2.id=this.IdBiggestStorage;
       this.device2.power=this.PowerUsageBiggestStorage;
       this.device2.deviceType="Stock";
     //console.log(response);
    });
  
  }




  monthPowerUsageConsumer: any;
  
  getmonthPowerUsageConsume() {
    const id = 1 ;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Consumer';
;

  this.deviceService.getmonth(id,year,month,consumer).subscribe((response: any) => {
      this.monthPowerUsageConsumer=response.toFixed(2);
    });
  
  }

  monthPowerUsageProducer: any;
  
  getmonthPowerUsageProducer() {
    const id = 1 ;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Producer';


    this.deviceService.getmonth(id,year,month,consumer).subscribe((response: any) => {
      this.monthPowerUsageProducer=response.toFixed(2);
    });
  
  }

  monthPowerUsageStorage: any;
  
  getmonthPowerUsageStorage() {
    const id = 1 ;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Stock';

    this.deviceService.getmonth(id,year,month,consumer).subscribe((response: any) => {
      this.monthPowerUsageStorage=response.toFixed(2);
    });
  
  }

  dayPowerPrice: any;
  
  getdayPowerPrice() {
  
    this.deviceService.getprice().subscribe((response: any) => {
      this.dayPowerPrice=response.toFixed(2);
    });
  
  }

  news: any[] = [];
  
  naslov1 : any;
  naslov2 : any;
  naslov3 : any;

  sadrzaj1 : any;
  sadrzaj2 : any;
  sadrzaj3 : any;

  datum1 : any;
  datum2 : any;
  datum3 : any;

  status1 : any;
  status2 : any;
  status3 : any;
  getNews() {
  
    this.dsonew.getnew().subscribe((data: any) => {
      this.news = data;
      this.news.sort((a, b) => b.id - a.id);
      //console.log(data);


     this.naslov1 = this.news[0].title;
     this.naslov2 = this.news[1].title;
     this.naslov3 = this.news[2].title;

     this.sadrzaj1 = this.news[0].content;
     this.sadrzaj2 = this.news[1].content;
     this.sadrzaj3 = this.news[2].content;

     this.datum1 = new Date(this.news[0].created).toLocaleDateString();
     this.datum2 = new Date(this.news[1].created).toLocaleDateString();
     this.datum3 = new Date(this.news[2].created).toLocaleDateString();

     this.status1 = this.news[0].priority;
     this.status2 = this.news[1].priority;
     this.status3 = this.news[2].priority;


     console.log(this.news);
    });
  
  }



  ngOnInit(): void {
    this.getNews();
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
