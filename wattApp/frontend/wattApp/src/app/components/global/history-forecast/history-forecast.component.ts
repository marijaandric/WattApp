import { style } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  ApexAxisChartSeries,ApexDataLabels,ApexLegend,ApexMarkers, ApexTooltip, ApexStroke, ApexFill, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserService } from 'src/app/services/user.service';
import { HistoryLineChartComponent } from '../../Prosumer/history-line-chart/history-line-chart.component';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-history-forecast',
  styleUrls: ['./history-forecast.component.scss'],
  templateUrl: './history-forecast.component.html',
})
export class HistoryForecastComponent implements OnInit,OnChanges{
  menageUserForm! : FormGroup;
  cities: City[];
  selectedCity!: City;
  Title : any = "History & forecast";

  @Input() array : any[]  = [12.00, 19.00, 33.00, 5.00, 2.00, 6.00, 5.00, null,null,null,null, null, null, null]
  @Input() array2 : any[] = [null,null, null, null, null, null,5.00,10.00,12.00,23.00,16.00,5.00,10.00,5.00]
  @Input() array3 : any[] = [null,null, null, null, null, null,null,null, null, null, null, null,null,null]
  @Input() naziv1 = "History";
  @Input() naziv2 = "Forecast";
  @Input() boja1 = '#f5805a';
  @Input() boja2 = '#f5805a';


  constructor(private userService:UserService, private authService:AuthService, private deviceService:DeviceService) {
    this.cities = [
      {name: 'Consumption', code: '1'},
      {name: 'Production', code: '2'},
      {name: 'Stock', code: '3'},
      {name: 'All', code: '4'},
  ];
 
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.series = [
      {
        name: this.naziv1,
        data: this.array,
        color: this.boja1,
        
      },
      {
        name: this.naziv2,
        data: this.array2,
        color: this.boja2,
      }
    ];

     this.xaxis = {
      title:{
        text:"date",
        style :{
          color:'white',
          fontFamily: 'Montserrat,sans-serif',
          fontSize: '16px' 
        }
      },
      categories: this.array3,
      labels: {
        style: {
          colors: ['#FFF','#FFF','#FFF','#FFF', '#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF'],
          fontSize: '16px',
          fontWeight: 'bolder',
          fontFamily: 'Lato, sans-serif'
        }
      }
    };

  }




  // chart podesavanja
  public series: ApexAxisChartSeries = [
    {
      name: 'Consumption history',
      data: this.array,
      color: '#7d02d4'
      
    },
    {
      name: "Consumption forecast",
      data: this.array2,
      color: '#ab36ff'
    }
  ];

  public marker: ApexMarkers = {
    size:4,
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
      easing: 'easein',
      speed: 800,
      animateGradually: {
          enabled: false,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 650
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
    },
  }

  /*public fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#a17abd','','#e1a2c7','','#afecda',''],
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 30, 70],
    }
  }*/
  

  public legend: ApexLegend = {
    showForNullSeries:false,
    showForSingleSeries:false,
    showForZeroSeries:false,
    fontFamily: 'Lato, sans-serif',
    fontSize: '16px',
    offsetY:10,
    labels : {
      useSeriesColors:true
    },
    
  }

  public xaxis: ApexXAxis = {
    title:{
      text:"date",
      style :{
        color:'white',
        fontFamily: 'Montserrat,sans-serif',
        fontSize: '16px' 
      }
    },
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: {
      style: {
        colors: ['#FFF','#FFF','#FFF','#FFF', '#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF'],
        fontSize: '16px',
        fontWeight: 'bolder',
        fontFamily: 'Lato, sans-serif'
      }
    }
  };

  public yaxis: ApexYAxis = {
    title:{
      text:"kwh",
      style :{
        color:'white',
        fontFamily: 'Montserrat,sans-serif',
        fontSize: '16px' 
      }
    },
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
    text: this.Title,
    style: {
      color: '#FFF',
      fontSize: '19px',
      fontFamily: 'Montserrat'
    }
  };

  public stroke: ApexStroke = {
    curve: 'straight',
    width: 3,
    dashArray:[0,5,0,5,0,5]
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
