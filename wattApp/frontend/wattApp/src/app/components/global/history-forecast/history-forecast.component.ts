import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  ApexAxisChartSeries,ApexDataLabels,ApexLegend, ApexTooltip, ApexStroke, ApexFill, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-history-forecast',
  styleUrls: ['./history-forecast.component.scss'],
  templateUrl: './history-forecast.component.html',
})
export class HistoryForecastComponent {
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
      data: [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null],
      color: '#7d02d4'
    },
    {
      name: "Consumption forecast",
      data: [null,null, null, null, null, null,5,10,12,3,16,5,10,5],
      color: '#ab36ff',
    },
    {
      name: 'Production history',
      data: [1, 4, 15, 5, 12, 6, 18, null,null,null,null, null, null, null],
      color:  '#d90372'
    },
    {
      name: "Production forecast",
      data: [null,null, null, null, null, null,18,1,2,7,6,9,10,5],
      color: '#ff7bbf'
    },
    {
      name: 'Stock history',
      data: [12, 1, 3, 15, 12, 6, 9, null,null,null,null, null, null, null],
      color:'rgb(4, 167, 119)'
    },
    {
      name: "Stock forecast",
      data: [null,null, null, null, null, null,9,17,12,10,16,5,1,2],
      color: 'rgb(114, 255, 213)'
    },
      
  ];
  public chart: ApexChart = {
    type: 'line',
    height: 300,
    width: '100%',
    offsetX: 0,
    background: '#1b1b1b',
    animations: {
      enabled: false,
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
      colors: ['#7d02d4','#ab36ff', '#d90372', '#ff7bbf','rgb(4, 167, 119)', 'rgb(114, 255, 213)', ],
      useSeriesColors:true
    },
    
  }

  public xaxis: ApexXAxis = {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: {
      style: {
        colors: ['#FFF','#FFF','#FFF','#FFF', '#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF']
      }
    }
  };

  public yaxis: ApexYAxis = {
    labels: {
      style: {
        colors: ['#FFF'],
      },
    },
  };

  public title: ApexTitleSubtitle = {
    text: 'History & forecast of all users',
    style: {
      color: '#FFF',
      fontSize: '19px',
      fontFamily: 'Montserrat'
    }
  };

  public stroke: ApexStroke = {
    curve: 'smooth',
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
    foreColor: '#222234',
    padding: 4,
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
