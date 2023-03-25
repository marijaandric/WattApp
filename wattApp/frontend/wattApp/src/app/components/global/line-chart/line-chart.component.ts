import { Component, OnInit } from '@angular/core';
import {  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis } from 'ng-apexcharts';

@Component({
  selector: 'app-line-chart',
  styleUrls: ['./line-chart.component.css'],
  template: '<apx-chart [series]="series" [chart]="chart" [xaxis]="xaxis" [yaxis]="yaxis" [title]="title"></apx-chart>'
})
export class LineChartComponent implements OnInit {
  public series: ApexAxisChartSeries = [
    {
      name: 'Resorce',
      data: [12, 19, 3, 5, 2, 3,10,12,3,4,5],
    },
  ];
  public chart: ApexChart = {
    type: 'line',
    height: 500,
    width: 600,
  };
  public xaxis: ApexXAxis = {
    categories: ['Jan', 'Feb', 'Mar','Apr', 'Jun ', 'Jul','Avg','Sep','Oct','Nov','Dec'],
    labels: {
      style: {
        colors: ['#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF']
      }
    }
  };

  public yaxis: ApexYAxis = {
    labels: {
      style: {
        colors: ['white'],
      },
    },
  };

  public title: ApexTitleSubtitle = {
    text: 'Resource',
    style: {
      color: '#FFFFFF',
      fontSize: '19px',
      fontFamily: 'Montserrat'
    }
  };

  ngOnInit(): void {}
}