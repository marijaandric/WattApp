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
      {name: 'Stock', code: '3'},
      {name: 'All', code: '4'},
    ];
  }
  findConsumer(code: string): string {
    const type = this.type.find(item => item.code === code);
    return 'Consumer';
  }

  getDevicePerRoom(){
  const id = 1 ;
   // const deviceId = this.user.id ;
  const type = this.findConsumer('1');
  const number = 4;
  this.deviceService.devicesPerRooms(id, type, number).subscribe(data => {
      this.rooms = data.rooms;
      this.count = data.count;
    });
  }
  
 ngOnInit(): void {
   this.getDevicePerRoom();
  }
}