import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  ApexAxisChartSeries,ApexDataLabels,ApexLegend,ApexMarkers, ApexTooltip, ApexStroke, ApexFill, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-history-line-chart',
  templateUrl: './history-line-chart.component.html',
  styleUrls: ['./history-line-chart.component.css']
})
export class HistoryLineChartComponent {
  menageUserForm! : FormGroup;
  cities: City[];
  selectedCity!: City;

  constructor(private userService:UserService, private authService:AuthService) {
    this.cities = [
      {name: 'Consumption', code: '1'},
      {name: 'Production', code: '2'},
      {name: 'Stock', code: '3'},
      {name: 'All', code: '4'},
  ];
  }
  public series: ApexAxisChartSeries = [
    {
      name: 'Consumption history',
      data: [12, 19, 3, 5, 2, 6, 5],
      color: '#7d02d4'
    },
    {
      name: 'Production history',
      data: [1, 4, 15, 5, 12, 6, 18],
      color:  '#d90372'
    },
    {
      name: 'Stock history',
      data: [12, 1, 3, 15, 12, 6, 9],
      color:'rgb(4, 167, 119)'
    },
      
  ];

  public marker: ApexMarkers = {
    size:6,
    strokeWidth: 0,
    fillOpacity: 1,
    radius: 10,
    hover: {
      size:8
    }
  };
  public chart: ApexChart = {
    type: 'line',
    height: 250,
    width: '100%',
    offsetX: 0,
    background: '#1b1b1b',
    
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    },
    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 0,
      left: 3,
      blur: 2,
      color: '#000',
      opacity: 1
    },
    redrawOnParentResize: true,
    redrawOnWindowResize: true,
  };

  public tooltip: ApexTooltip = {
    theme:'dark',
    style : {
      fontSize:'17px'
    }
  }

  public legend: ApexLegend = {
    showForNullSeries:false,
    showForSingleSeries:false,
    showForZeroSeries:false,
    fontFamily: 'Lato, sans-serif',
    fontSize: '16px',
    offsetY:10,
    labels : {
      colors: ['#7d02d4', '#d90372','rgb(4, 167, 119)'],
      useSeriesColors:true
    },
    
  }

  public xaxis: ApexXAxis = {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: {
      style: {
        colors: ['#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF'],
        fontSize: '16px',
        fontWeight: 'bolder',
        fontFamily: 'Lato, sans-serif'
      }
    }
  };

  public yaxis: ApexYAxis = {

    labels: {
      style: {
        colors: ['#FFF'],
        fontSize:'16px',
        fontWeight:'bold',
        fontFamily: 'Lato, sans-serif'
      },
    },
  };

  public fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#a17abd','#e1a2c7','#afecda'],
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 200],
    }
  }

  public title: ApexTitleSubtitle = {
    text: 'History',
    style: {
      color: '#FFF',
      fontSize: '19px',
      fontFamily: 'Montserrat'
    }
  };

  public stroke: ApexStroke = {
    curve: 'straight',
    width: 3,
  }

  public dataLabels: ApexDataLabels = {
  textAnchor: 'middle',
  distributed: true,
  offsetX: 0,
  offsetY: 0,
  style: {
      fontSize: '20px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: ['#222222',]
  },
  background: {
    enabled: true,
    foreColor: '#FFF',
    padding: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#fff',
    opacity: 0.9,
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      color: '#222222',
      opacity: 1
    }
  },
  dropShadow: {
      enabled: false,
      top: 1,
      left: 1,
      blur: 1,
      color: '#000',
      opacity: 0.45
  },
  
  }
}
