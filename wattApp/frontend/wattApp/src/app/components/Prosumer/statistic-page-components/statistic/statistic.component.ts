import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from 'src/app/services/device/device.service';
import { ChartComponent } from 'ng-apexcharts';
import { PieChartComponent } from 'src/app/components/global/pie-chart/pie-chart.component';
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
  
  barchartHeight=250;

  piechartHeight1=300;

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

  color1 = '#885ec0';
  color2 = '#ae91d4';

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


  constructor(private http: HttpClient, private deviceService : DeviceService) {
    this.type = [
      {name: 'Consumption', code: 'Consumer'},
      {name: 'Production', code: 'Producer'},
      {name: 'Stock', code: 'Stock'},
    ];
  }


  getDevicePerRoom(){
    const deviceId = 1 ;
   // const deviceId = this.user.id ;
    const type = this.selectedType.code;
    const number = 4;
    this.deviceService.devicesPerRooms(deviceId, type, number).subscribe(data => {
      this.rooms = data.rooms;
      this.count = data.count;
     // this.niz1 = data.count;
     this.niz3 = this.count;
     this.myChart.Series = this.niz3;
    });
  }

  getHistoryAndForecastByDayForAllUserDevices() {
    const id = 1 ;
    // const Id = this.user.id ;
    this.deviceService.GetHistoryAndForecastByDayForAllUserDevices(id).subscribe(data => {
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

        this.color1 = '#885ec0';
        this.color2 = '#ae91d4';

        for(let i = 0;i<7;i++)
        {
          this.hif[i].history = this.HistoryCon[i]
          this.hif[i].forecast = this.ForecastCon[i+7]
          this.hif[i].date1 = this.arrayData[i]
          this.hif[i].date2 = this.arrayData[i+7]
        }
      });
  }

  
 ngOnInit(): void {
   this.getDevicePerRoom();
   this.getHistoryAndForecastByDayForAllUserDevices();
  }

  dropdownChange()
  {
    console.log(this.selectedType);
    if(this.selectedType.code == "Consumer")
    {
      this.History = this.HistoryCon;
      this.Forecast = this.ForecastCon;

      this.miniHistory=this.miniHistoryCon;
      this.miniForecast=this.miniForecastCon;
      

      this.name1="Consumption history";
      this.name2="Consumption forecast";

      this.color1 = '#885ec0';
      this.color2 = '#ae91d4';

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
      this.History = this.HistoryPro;
      this.Forecast = this.ForecastPro;

      this.miniHistory=this.miniHistoryPro;
      this.miniForecast = this.miniForecastPro;

      this.name1="Production history";
      this.name2="Production forecast";

      this.color1 = '#eb4886';
      this.color2 = '#f075a4';

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
      this.History = this.HistoryStock;
      this.Forecast = this.ForecastStock;

      this.miniHistory=this.miniHistoryStock;
      this.miniForecast = this.miniForecastStock;

      this.name1="Stock history";
      this.name2="Stock forecast";

      this.color1 = '#f5805a';
      this.color2 = '#f9b59f';

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

  
}