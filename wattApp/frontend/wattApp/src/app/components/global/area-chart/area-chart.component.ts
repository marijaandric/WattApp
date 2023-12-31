import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import {  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTooltip, ApexTitleSubtitle,ApexYAxis, ApexDataLabels } from 'ng-apexcharts';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit  {
  @Input() chartHeight: number = 400;
  @Input() chartWidth: number = 700;

  public series: ApexAxisChartSeries = [
    {
      name: 'Resorce',
      data: [12, 19, 13, 15, 12, 13,10,12,3,4,5],
      color: '#46c5f1'
    },
  ];

  public chart: ApexChart = {
    type: 'area',
    width:'100%',
    height:'100vh',
    background:'transparent',

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

  public dataLabels: ApexDataLabels = {
    enabled: false,
    
    };
   
  ngOnInit(): void {
    this.chart.height = '350';
  }

  
  public tooltip: ApexTooltip = {
    theme:'dark',
    style : {
      fontSize:'17px'
    },
  }
}
