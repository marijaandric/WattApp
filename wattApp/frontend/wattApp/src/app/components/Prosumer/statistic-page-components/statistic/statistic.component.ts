import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent  implements OnInit {
  type: City[];
  selectedType!: City;

  constructor(private http: HttpClient) {
    this.type = [
      {name: 'Consumption', code: '1'},
      {name: 'Production', code: '2'},
      {name: 'All', code: '4'},
  ];
  }

  
  barchartHeight=250;

  piechartHeight1=300;

  text='Total devices per room';
  text2='Consumers per room';
  text3='Producers per room';
  text4='Storage per room';


  niz1=[];
  niz2=[6,3,3,3];
  niz3=[10,20,20,1];
  niz4=[15,15,20,30];


  rooms: string[] =[];
  count: number[]=[];

  getDevicePerRoom() {
    const deviceId = 1 ;
   // const deviceId = this.user.id ;
    const type = 'Consumer';
    const number = 4;
    this.http.get<{rooms: string[], count: number[]}>(`https://localhost:7158/api/Devices/chart/${deviceId}/${type}/${number}`).subscribe(data => {
      this.rooms = data.rooms;
      this.count = data.count;
     // this.niz1 = data.count;
      console.log(data);
    });
  }
  
 ngOnInit(): void {
   this.getDevicePerRoom();
  }
}