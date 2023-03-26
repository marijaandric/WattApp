import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent  implements OnInit {
  constructor() {}
  chartHeight=400;
  chartWidth=1000;


  barchartHeight=290;

  piechartHeight1=500;

  text='Total devices per room';
  text2='Consumers per room';
  text3='Producers per room';
  text4='Storage per room';

  niz1=[90,10,20,40,60,30];
  niz2=[40, 32, 28, 15,90,31];
  niz3=[10,20,20,1,6,23];
  niz4=[15,15,20,30,4,12];
  ngOnInit(): void {}
  }
