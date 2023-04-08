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
  selector: 'app-forecast-line-chart',
  templateUrl: './forecast-line-chart.component.html',
  styleUrls: ['./forecast-line-chart.component.css']
})
export class ForecastLineChartComponent {
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
      name: "Consumption forecast",
      data: [5,10,12,3,16,5,10],
      color: '#ab36ff',
    },
    {
      name: "Production forecast",
      data: [18,1,2,7,6,9,10],
      color: '#ff7bbf'
    },
    {
      name: "Stock forecast",
      data: [9,17,12,10,16,5,1],
      color: 'rgb(114, 255, 213)'
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
    redrawOnParentResize: false,
    redrawOnWindowResize: false,
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
      colors: ['#ab36ff', '#ff7bbf', 'rgb(114, 255, 213)' ],
      useSeriesColors:true
    },
    
  }

  public fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#7d02d4', '#d90372','rgb(4, 167, 119)'],
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 200],
    }
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

  public title: ApexTitleSubtitle = {
    text: 'Forecast',
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
