import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from 'src/app/services/device/device.service';
import { ChartComponent } from 'ng-apexcharts';
import { PieChartComponent } from 'src/app/components/global/pie-chart/pie-chart.component';
import { UserService } from 'src/app/services/user.service';
interface City {
  name: string,
  code: string
}
interface SwitchOption {
  label: string;
  value: boolean;
}
interface HiF{
  history: any,
  forecast: any,
  date1: any,
  date2: any
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent  implements OnInit {
  type: City[];
  selectedType : City ={name: 'Consumption', code: 'Consumer'};
  @ViewChild('myChart', { static: true }) myChart! : PieChartComponent;
  token = localStorage.getItem('token');
  user:any;
  id : any;
  loader = true;

  switchValue: boolean = true;
  hif : HiF[]  = [{history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []}];

  switchOptions: SwitchOption[] = [
    {label: 'History', value: true},
    {label: 'Forecast', value: false}
  ];


  niz1 = [];
  niz2 = [6,3,3,3];
  niz3 : number[] = new Array(4);   //[1,2,3,4]
  niz4 = [15,15,20,30];
  

  text='Total devices per room';
  text2='Consumers per room';
  text3='Producers per room';
  text4='Storage per room';


  rooms: string[] =[];
  count: number[]=[];
  
  History = [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null];
  Forecast= [null,null, null, null, null, null,5,10,12,3,16,5,10,5];
  miniHistory = [12, 19, 3, 5, 2, 6, 5];
  miniForecast= [5,10,12,3,16,5,10];

  arrayData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  arrayData1 = [1,2,3,4,5,6,7];
  arrayData2 = [8,9,10,11,12,13,14];

  miniarrayData1 = [1,2,3,4,5,6,7];
  miniarrayData2 = [8,9,10,11,12,13,14];

  name1 = "history";
  name2 = "forecast";

  color1 = '#46c5f1';
  color2 = '#88dbf6';

  HistoryCon = [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null];
  ForecastCon= [null,null, null, null, null, null,5,10,12,3,16,5,10,5];
  HistoryPro = [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null];
  ForecastPro= [null,null, null, null, null, null,5,10,12,3,16,5,10,5];
  HistoryStock = [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null];
  ForecastStock = [null,null, null, null, null, null,5,10,12,3,16,5,10,5];

  miniHistoryCon = [12, 19, 3, 5, 2, 6, 5];
  miniForecastCon= [5,10,12,3,16,5,10,5];

  miniHistoryPro = [12, 19, 3, 5, 2, 6, 5];
  miniForecastPro= [5,10,12,3,16,5,10,5];

  miniHistoryStock = [12, 19, 3, 5, 2, 6, 5];
  miniForecastStock= [5,10,12,3,16,5,10,5];


  constructor(private http: HttpClient, private deviceService : DeviceService,private userService:UserService,) {
    this.type = [
      {name: 'Consumption', code: 'Consumer'},
      {name: 'Production', code: 'Producer'},
      {name: 'Stock', code: 'Stock'},
    ];
    if(this.token)
    {
      this.id = this.userService.getUserIdFromToken(this.token);
      userService.GetUser(this.id,this.token).subscribe((data) => {
        this.user = data;
      });
    }
  }


  getDevicePerRoom(){
    const type = this.selectedType.code;
    const number = 4;
    this.deviceService.devicesPerRooms(this.id, type, number).subscribe(data => {
      this.rooms = data.rooms;
      this.count = data.count;
     // this.niz1 = data.count;
     this.niz3 = this.count;
     this.myChart.Series = this.niz3;
    });
  }

  getHistoryAndForecastByDayForAllUserDevices() {
    const type = 'week';
    this.deviceService.GetHistoryAndForecastByDayForAllUserDevices(this.id,type).subscribe(data => {
      this.loader = false;
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));
        this.miniarrayData1=data.dates.slice(0, 7);
        this.miniarrayData2=data.dates.slice(8, 14);

        this.HistoryCon = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
        this.ForecastCon = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
        this.HistoryPro = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
        this.ForecastPro = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
        this.HistoryStock = data.totaldatasStock.map((val: number) => +val.toFixed(2));
        this.ForecastStock = data.totaldatasStock.map((val: number) => +val.toFixed(2));

        this.miniHistoryCon = data.totaldatasConsumer.slice(0, 7).map((val: number) => +val.toFixed(2));
        this.miniForecastCon = data.totaldatasConsumer.slice(8,14).map((val: number) => +val.toFixed(2));

        this.miniHistoryPro = data.totaldatasProducer.slice(0, 7).map((val: number) => +val.toFixed(2));
        this.miniForecastPro = data.totaldatasProducer.slice(8,14).map((val: number) => +val.toFixed(2));


        this.miniHistoryStock = data.totaldatasStock.slice(0, 7).map((val: number) => +val.toFixed(2));
        this.miniForecastStock = data.totaldatasStock.slice(8,14).map((val: number) => +val.toFixed(2));

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

        this.miniHistory=this.miniHistoryCon;
        this.miniForecast=this.miniForecastCon;

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

  numbersComparison: number[] = [];
  getDeviceComparison(){
    this.deviceService.getDeviceComparison(this.id).subscribe(data => {
    this.numbersComparison.push(data.Consumer, data.Producer, data.Stock);
    //console.log(this.numbersComparison);
    });
  }

  
 ngOnInit(): void {
   this.getDevicePerRoom();
   this.getHistoryAndForecastByDayForAllUserDevices();
   this.getDeviceComparison();
   this.getConsumergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
   this.getProducergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
   this.getStockgetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
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
    this.getDevicePerRoom();
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

      this.miniHistory=this.miniHistoryCon;
      this.miniForecast=this.miniForecastCon;
      

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

      this.miniHistory=this.miniHistoryPro;
      this.miniForecast = this.miniForecastPro;

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
      for(let i = 0;i<7;i++)
      {
        this.HistoryPro[i]
        this.hif[i].forecast = this.ForecastPro[i+7]
        this.arrayData[i]
        this.arrayData[i+7]
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

      this.miniHistory=this.miniHistoryStock;
      this.miniForecast = this.miniForecastStock;

      this.name1="Stock history";
      this.name2="Stock forecast";

      this.color1 = '#eb4886';
      this.color2 = '#f075a4';

      for(let i = 0;i<this.History.length;i++)
      {
        this.hif[i].history = this.HistoryStock[i]
        this.hif[i].forecast = this.ForecastStock[i+7]
        this.hif[i].date1 = this.arrayData[i]
        this.hif[i].date2 = this.arrayData[i+7]
      }
    }
    console.log(this.hif)
   
  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }



}