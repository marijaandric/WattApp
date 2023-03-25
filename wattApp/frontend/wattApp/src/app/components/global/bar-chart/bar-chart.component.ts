import { Component, OnInit } from '@angular/core';
import {  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis } from 'ng-apexcharts';

@Component({
  selector: 'app-bar-chart',
  styleUrls: ['./bar-chart.component.css'],
  template: '<apx-chart [series]="series" [chart]="chart" [xaxis]="xaxis" [yaxis]="yaxis" [title]="title"></apx-chart>',
})
export class BarChartComponent implements OnInit {
  public series: ApexAxisChartSeries = [
    {
      name: 'Resorce',
      data: [120, 39, 32],
    },
  ];
  public chart: ApexChart = {
    type: 'bar',
    height: 300,
    width: '100%',
  };
  public xaxis: ApexXAxis = {
    categories: ['Consumption', 'Production', 'Stock'],
    labels: {
      style: {
        colors: ['#F48207', '#85E000', '#D63F74']
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
      fontSize: '19px'
    }
  };

  ngOnInit(): void {}
}