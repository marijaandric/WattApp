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
  
 ngOnInit(): void {
   this.getDevicePerRoom();
  }

  dropdownChange()
  {
    console.log(this.selectedType)
    this.getDevicePerRoom();
  }
}