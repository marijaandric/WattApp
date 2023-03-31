import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from 'src/app/services/device/device.service';
import { ChartComponent } from 'ng-apexcharts';
import { PieChartComponent } from 'src/app/components/global/pie-chart/pie-chart.component';
interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent  implements OnInit {
  type: City[];
  selectedType!: City;
  @ViewChild('myChart', { static: true }) myChart! : PieChartComponent;

  niz1 = [];
  niz2 = [6,3,3,3];
  niz3 : number[] = new Array(4);
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
      {name: 'Consumption', code: '1'},
      {name: 'Production', code: '2'},
      {name: 'All', code: '4'},
    ];
  }


  getDevicePerRoom(){
    const deviceId = 1 ;
   // const deviceId = this.user.id ;
    const type = 'Consumer';
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
}