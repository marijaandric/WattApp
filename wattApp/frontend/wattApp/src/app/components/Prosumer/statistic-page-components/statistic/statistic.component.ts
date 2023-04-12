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


  arrayData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  name1 = "history";
  name2 = "forecast";

  color1 = '#f5805a';
  color2 = '#f9b59f';


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
    const deviceId = 1;
    // const deviceId = this.user.id ;

    this.deviceService.GetHistoryAndForecastByDayForAllUserDevices(deviceId).subscribe(data => {
      if (this.selectedType.code == 'Consumer') {
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));

        this.History = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
        this.Forecast = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));

        for (let i = 8; i < 14; i++) {
          this.History[i] = null;
        }

        for (let i = 0; i < 7; i++) {
          this.Forecast[i] = null;
        }

        this.name1="Consumption history";
        this.name2="Consumption forecast";

        this.color1 = '#f5805a';
        this.color2 = '#f9b59f';
      }

      else if (this.selectedType.code == 'Producer') {
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));

        this.History = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
        this.Forecast = data.totaldatasProducer.map((val: number) => +val.toFixed(2));

        for (let i = 8; i < 14; i++) {
          this.History[i] = null;
        }

        for (let i = 0; i < 7; i++) {
          this.Forecast[i] = null;
        }

        this.name1="Production history";
        this.name2="Production forecast";

        this.color1 = '#46c5f1';
        this.color2 = '#71d3f4';
      }

      else if (this.selectedType.code == 'Stock') {
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));

        this.History = data.totaldatasStock.map((val: number) => +val.toFixed(2));
        this.Forecast = data.totaldatasStock.map((val: number) => +val.toFixed(2));

        for (let i = 8; i < 14; i++) {
          this.History[i] = null;
        }

        for (let i = 0; i < 7; i++) {
          this.Forecast[i] = null;
        }

        this.name1="Stock history";
        this.name2="Stock forecast";

        this.color1 = '#885ec0';
        this.color2 = '#ae91d4';
      }

      console.log(this.History);
      console.log(this.Forecast);

      // console.log(this.arrayData);
    });
  }
  
 ngOnInit(): void {
   this.getDevicePerRoom();
   this.getHistoryAndForecastByDayForAllUserDevices();
  }

  dropdownChange()
  {
    console.log(this.selectedType)
    this.getDevicePerRoom();
    this.getHistoryAndForecastByDayForAllUserDevices();
  }

  
}