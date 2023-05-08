import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device/device.service';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';

import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';


interface HiF{
  history: any,
  forecast: any,
  date1: any,
  date2: any
}

interface SwitchOption {
  label: string;
  value: boolean;
}

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-user-dso',
  templateUrl: './user-dso.component.html',
  styleUrls: ['./user-dso.component.css']
})
export class UserDSOComponent implements OnInit{
  id : any;
  Consumer:string='Consumer';
  Producer:string='Producer';
  Stock:string='Stock';
  user:any;
  type: City[];
  selectedType!: City;

  responsiveOptions: any = null;

  hif : HiF[]  = [{history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []}];  
  
  name1 = "history";
  name2 = "forecast";

  color1 = '#46c5f1';
  color2 = '#88dbf6';

  HistoryCon = [null,null,null,null, null, null, null, null,null,null,null, null, null, null];
  ForecastCon= [null,null, null, null, null, null,null,null,null,null, null, null, null];
  HistoryPro = [null,null,null,null, null, null, null, null,null,null,null, null, null, null];
  ForecastPro= [null,null, null, null, null, null,null,null,null,null, null, null, null];
  HistoryStock = [null,null,null,null, null, null, null, null,null,null,null, null, null, null];
  ForecastStock = [null,null, null, null, null, null,null,null,null,null, null, null, null];
  arrayData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  arrayData1 = [1,2,3,4,5,6,7];
  arrayData2 = [8,9,10,11,12,13,14];
  
  History = [null,null,null,null, null, null, null, null,null,null,null, null, null, null];
  Forecast= [null,null,null,null, null, null, null, null,null,null,null, null, null, null];

  switchOptions: SwitchOption[] = [
    {label: 'Statistics', value: true},
    {label: 'Devices', value: false}
  ];
  switchValue: boolean = true;



  constructor(private route: ActivatedRoute,private dsonew : DsonewsService,private userService:UserService,private deviceService:DeviceService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.type = [
      {name: 'Consumption', code: 'Consumer'},
      {name: 'Production', code: 'Producer'},
      {name: 'Stock', code: 'Stock'},
    ];
    this.selectedType = {name: 'Consumption', code: 'Consumer'}
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
    this.getHistoryAndForecastByDayForAllUserDevices();
    this.getConsumergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
   this.getProducergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
   this.getStockgetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
  }

  getUser()
  {
      this.userService.GetUserWithoutToken(this.id).subscribe(data =>{
        this.user = data;
        console.log(data)
      })
    
  }

  

  getHistoryAndForecastByDayForAllUserDevices() {
    const type = 'week';
    this.deviceService.GetHistoryAndForecastByDayForAllUserDevices(this.id,type).subscribe(data => {
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));
        
        this.HistoryCon = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
        this.ForecastCon = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
        this.HistoryPro = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
        this.ForecastPro = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
        this.HistoryStock = data.totaldatasStock.map((val: number) => +val.toFixed(2));
        this.ForecastStock = data.totaldatasStock.map((val: number) => +val.toFixed(2));

        for (let i = 8; i < 14; i++) {
          this.HistoryCon[i] = null;
          this.HistoryPro[i] = null;
          this.HistoryStock[i] = null;
        }

        for (let i = 0; i < 7; i++) {
          this.ForecastCon[i] = null;
          this.ForecastPro[i] = null;
          this.ForecastStock[i] = null;
        }

        this.History = this.HistoryCon;
        this.Forecast = this.ForecastCon;
        console.log(this.History)

        this.name1="Consumption history";
        this.name2="Consumption forecast";

        this.color1 = '#46c5f1';
        this.color2 = '#88dbf6';

        for(let i = 0;i<7;i++)
        {
          this.hif[i].history = this.HistoryCon[i]
          this.hif[i].forecast = this.ForecastCon[i+7]
          this.hif[i].date1 = this.arrayData[i]
          this.hif[i].date2 = this.arrayData[i+7]
        }
      });
  }
  total: any;
  average: any;
  min: any;
  max: any;

  TitleMin='Minimal consumed electricity this week';
  TittleMax='Maximum consumed electricity this week';
  TitleAverage='Average consumed electricity this week';
  TitleTotal='Total consumed electricity this week';

  Consumertotal: any;
  Consumeraverage: any;
  Consumermin: any;
  Consumermax: any;

  getConsumergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType() {
    const deviceType = 'Consumer';
    const timeType = 'week';

    this.deviceService.getMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType(this.id,deviceType,timeType).subscribe(data => {
      const keys = Object.keys(data);
      this.Consumermax = data[keys[0]].toFixed(2);
      this.Consumermin = data[keys[1]].toFixed(2);
      this.Consumertotal=data.total.toFixed(2);
      this.Consumeraverage=data.average.toFixed(2);

      this.max=this.Consumermax;
      this.min= this.Consumermin;
      this.average=this.Consumeraverage;
      this.total=this.Consumertotal;

      // console.log(this.max);
      // console.log(this.min);
      // console.log(this.total);
      // console.log(this.average);

  });
}

Producertotal: any;
Produceraverage: any;
Producermin: any;
Producermax: any;

getProducergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType() {
  const deviceType = 'Producer';
  const timeType = 'week';

  this.deviceService.getMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType(this.id,deviceType,timeType).subscribe(data => {
    const keys = Object.keys(data);
    this.Producermax = data[keys[0]].toFixed(2);
    this.Producermin = data[keys[1]].toFixed(2);
    this.Producertotal=data.total.toFixed(2);
    this.Produceraverage=data.average.toFixed(2);
 
    // console.log(this.max);
    // console.log(this.min);
    // console.log(this.total);
    // console.log(this.average);

});
}

Stocktotal: any;
Stockaverage: any;
Stockmin: any;
Stockmax: any;

getStockgetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType() {
  const deviceType = 'Stock';
  const timeType = 'week';

  this.deviceService.getMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType(this.id,deviceType,timeType).subscribe(data => {
    const keys = Object.keys(data);
    this.Stockmax = data[keys[0]].toFixed(2);
    this.Stockmin = data[keys[1]].toFixed(2);
    this.Stocktotal=data.total.toFixed(2);
    this.Stockaverage=data.average.toFixed(2);
 
    // console.log(this.max);
    // console.log(this.min);
    // console.log(this.total);
    // console.log(this.average);

});
}

  dropdownChange()
  {
    console.log(this.selectedType);
    if(this.selectedType.code == "Consumer")
    {
      this.TitleMin='Minimal consumed electricity this week';
      this.TittleMax='Maximum consumed electricity this week';
      this.TitleAverage='Average consumed electricity this week';
      this.TitleTotal='Total consumed electricity this week';

      this.max=this.Consumermax;
      this.min= this.Consumermin;
      this.average=this.Consumeraverage;
      this.total=this.Consumertotal;

      this.History = this.HistoryCon;
      this.Forecast = this.ForecastCon;

      this.name1="Consumption history";
      this.name2="Consumption forecast";

      this.color1 = '#46c5f1';
      this.color2 = '#88dbf6';

      for(let i = 0;i<this.History.length;i++)
      {
        this.hif[i].history = this.HistoryCon[i]
        this.hif[i].forecast = this.ForecastCon[i+7]
        this.hif[i].date1 = this.arrayData[i]
        this.hif[i].date2 = this.arrayData[i+7]
      }
    }
    else if(this.selectedType.code == "Producer")
    {
      this.TitleMin='Minimal produced electricity this week';
      this.TittleMax='Maximum produced electricity this week';
      this.TitleAverage='Average produced electricity this week';
      this.TitleTotal='Total produced electricity this week';

      this.max=this.Producermax;
      this.min= this.Producermin;
      this.average=this.Produceraverage;
      this.total=this.Producertotal;

      this.History = this.HistoryPro;
      this.Forecast = this.ForecastPro;

      this.name1="Production history";
      this.name2="Production forecast";

      this.color1 = '#885ec0';
      this.color2 = '#ae91d4';

      for(let i = 0;i<this.History.length;i++)
      {
        this.hif[i].history = this.HistoryPro[i]
        this.hif[i].forecast = this.ForecastPro[i+7]
        this.hif[i].date1 = this.arrayData[i]
        this.hif[i].date2 = this.arrayData[i+7]
      }
    }
    else{
      this.TitleMin='Minimal stocked electricity this week';
      this.TittleMax='Maximum stocked electricity this week';
      this.TitleAverage='Average stocked electricity this week';
      this.TitleTotal='Total stocked electricity this week';
      
      this.max=this.Stockmax;
      this.min= this.Stockmin;
      this.average=this.Stockaverage;
      this.total=this.Stocktotal;
      
      this.History = this.HistoryStock;
      this.Forecast = this.ForecastStock;

      this.name1="Stock history";
      this.name2="Stock forecast";

      this.color1 = '#eb4886';
      this.color2 = '#f075a4';

      for(let i = 0;i<this.History.length;i++)
      {
        this.hif[i].history = this.HistoryStock[i]
        this.hif[i].forecast =   this.ForecastStock[i+7]
        this.hif[i].date1 = this.arrayData[i]
        this.hif[i].date2 = this.arrayData[i+7]
      }
    }
    console.log(this.hif)
  
}
}
