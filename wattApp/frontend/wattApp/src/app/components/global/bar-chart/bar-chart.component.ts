import { Component, OnInit } from '@angular/core';
import {  ApexAxisChartSeries,ApexFill, ApexTooltip,ApexPlotOptions, ApexStroke,ApexLegend, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis } from 'ng-apexcharts';

@Component({
  selector: 'app-bar-chart',
  styleUrls: ['./bar-chart.component.css'],
  template: '<apx-chart [series]="series" [tooltip]="tooltip" [plotOptions]="plotOptions" [stroke]="stroke"  [legend]="legend" [fill]="fill" [chart]="chart" [xaxis]="xaxis" [yaxis]="yaxis" [title]="title"></apx-chart>',
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
    
    redrawOnParentResize:true,
    redrawOnWindowResize:true
  };
  public xaxis: ApexXAxis = {
    categories: ['Erdoglija', 'Centar', 'Pivara'],
    offsetY: 10,
    labels: {
      style: {
        colors: ['#7d02d4', 'rgb(217, 3, 114)','rgb(4, 167, 119)', ],
        fontSize: '17px',
      }
    }
  };

  public stroke: ApexStroke = {
    curve: 'smooth',
  }

  public legend: ApexLegend = {
    show:false
  }

  public fill: ApexFill = {
    type: 'solid',
    opacity: 1,
    colors: ['#7d02d4','rgb(217, 3, 114)',  'rgb(4, 167, 119)', ],
    
  }

  public tooltip: ApexTooltip = {
    fillSeriesColor : false,
    theme:'dark',
    style: {
      fontSize: '17px',
      fontFamily: 'Lato, sans-serif',
    },
  }

  public yaxis: ApexYAxis = {
    labels: {
      style: {
        colors: ['white'],
      },
    },
  };

  public plotOptions: ApexPlotOptions = {
    bar : {
      borderRadius: 10,
      columnWidth: '50%',
      distributed:true,
      borderRadiusWhenStacked: 'last',
    }
  }

  public title: ApexTitleSubtitle = {
    text: 'City areas',
    style: {
      color: '#FFFFFF',
      fontSize: '19px'
    }
  };

  ngOnInit(): void {}
}