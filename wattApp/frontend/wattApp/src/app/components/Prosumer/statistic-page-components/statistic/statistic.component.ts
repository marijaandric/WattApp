import { Component, OnInit } from '@angular/core';
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
  constructor() {
    this.type = [
      {name: 'Consumption', code: '1'},
      {name: 'Production', code: '2'},
      {name: 'Stock', code: '3'},
      {name: 'All', code: '4'},
  ];
  }
  barchartHeight=250;

  piechartHeight1=400;

  text='Total devices per room';
  text2='Consumers per room';
  text3='Producers per room';
  text4='Storage per room';

  niz1=[90,10,20,40];
  niz2=[40, 32, 28, 15];
  niz3=[10,20,20,1];
  niz4=[15,15,20,30];
  ngOnInit(): void {}
  }
