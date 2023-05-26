import { style } from '@angular/animations';
import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  ApexAxisChartSeries,ApexDataLabels,ApexLegend,ApexMarkers, ApexTooltip, ApexStroke, ApexFill, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserService } from 'src/app/services/user/user.service';
import { HistoryLineChartComponent } from '../../Prosumer/history-line-chart/history-line-chart.component';
import * as ApexCharts from 'apexcharts';

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
  hostElement: HTMLElement | undefined;
  lightBackground: boolean = false;
  xAxisColors: string[] = [];
  titleColor: string = "";
  themeChart: string = "";
  yAxisColos: string = "";
  menageUserForm! : FormGroup;
  cities: City[];
  selectedCity!: City;
  dark: Boolean = true;

  @Input() array : any[]  = [null,null,null,null, null, null, null, null,null,null,null, null, null, null];
  @Input() array2 : any[] = [null,null,null,null, null, null, null, null,null,null,null, null, null, null];
  @Input() array3 : any[] = [null,null, null, null, null, null,null,null, null, null, null, null,null,null]
  @Input() naziv1 = "History";
  @Input() naziv2 = "Forecast";
  @Input() boja1 = '#885ec0';
  @Input() boja2 = '#ae91d4';
  @Input() Title ='History & forecast'
  @Input() Period ='week'


  constructor(private userService:UserService, private authService:AuthService, private deviceService:DeviceService, private elementRef: ElementRef, private renderer: Renderer2) {
    this.cities = [
      {name: 'Consumption', code: '1'},
      {name: 'Production', code: '2'},
      {name: 'Stock', code: '3'},
      {name: 'All', code: '4'},
  ];
 
  }

  async ngOnInit(): Promise<void> {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
      this.dark = dark;
    
    });
    
    /*
    this.xAxisColors = ['#FFF','#FFF','#FFF','#FFF', '#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF'];
    */
   this.themeChart = 'dark';
  }

  forecastArray(niz: number[]): number[] {
    const rezultat: number[] = [];
    let niz2 = [20.20,13.30,-5.00,0.00,-4.00,29.20,22.00,0.23,45.00,58.98,74.22,12.44,22.11];
  
    if(this.Period =="year")
    {
      niz2 = [55.03,145.12,66.83,-143.11,-74.92,44.65,-10.55,134.22,11.00,67.00,89.77,66.93]
    }
    for (let i = 0; i < niz.length; i++) {
      rezultat.push(parseFloat((niz[i] + niz2[i]).toFixed(2)));
    }
  
    return rezultat;
  }

  forecastZero(niz: number[]): number[] {
    const rezultat: number[] = [];
  
    for (let i = 0; i < niz.length; i++) {
      rezultat.push(0.00);
    }
  
    return rezultat;
  }


  ngOnChanges(changes: SimpleChanges) {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
      this.dark = dark;

      
    if(this.array[0] === null)
    {
      this.series = [
        {
          name: this.naziv2,
          data: this.array2,
          color: this.boja2,
          
        }
      ]
    }
    else if(this.array2[0] === null)
    {
        this.series = [
          {
            name: this.naziv1,
            data: this.array,
            color: this.boja1,
          },
          {
            name: this.naziv2,
            data: this.forecastArray(this.array),
            color: this.boja1,
          }
        ]
    }
    else{
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
    }
    
    
    if(this.dark == true)
    {

      this.xaxis = {
        title:{
          text: this.Period,
          style :{
            color: '#FFF',
            fontFamily: 'Montserrat,sans-serif',
            fontSize: '16px' 
          }
        },
        categories: this.array3,
        labels: {
          style: {
            colors: '#FFF',
            fontSize: '16px',
            fontFamily: 'Lato, sans-serif'
          }
        }
      };

      this.yaxis = {
        title:{
          text:"Electric energy [kWh]",
          style :{
            color:'#FFF',
            fontFamily: 'Montserrat,sans-serif',
            fontSize: '14px' 
          }
        },
        labels: {
          style: {
            colors: '#FFF',
            fontSize:'16px',
            fontFamily: 'Lato, sans-serif'
          },
        },
      }
      
      this.title = {
        text: this.Title,
        style: {
          color: '#FFF',
          fontSize: '19px',
          fontFamily: 'Montserrat'
        }
      };
    }
    else {

      this.xaxis = {
        title:{
          text: this.Period,
          style :{
            color: '#000',
            fontFamily: 'Montserrat,sans-serif',
            fontSize: '16px' 
          }
        },
        categories: this.array3,
        labels: {
          style: {
            colors: '#000',
            fontSize: '16px',
            fontFamily: 'Lato, sans-serif'
          }
        }
      };
      
      this.yaxis = {
        title:{
          text:"Electric energy [kWh]",
          style :{
            color:'#000',
            fontFamily: 'Montserrat,sans-serif',
            fontSize: '14px' 
          }
        },
        labels: {
          style: {
            colors: '#000',
            fontSize:'16px',
            fontFamily: 'Lato, sans-serif'
          },
        },
      }
      this.title = {
        text: this.Title,
        style: {
          color: '#000',
          fontSize: '19px',
          fontFamily: 'Montserrat'
        }
      };
    }


    const options = {
      series: this.series,
    };

    const chart2 = new ApexCharts(document.querySelector("#chart2"), options);
    chart2.render();
    });


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
    size:[8,8],
    strokeWidth: 0,
    fillOpacity: 1,
    radius: 10,
    hover: {
      size:8
    }
  };
  public chart: ApexChart = {
    type: 'area',
    height: 300,
    width: '100%',
    offsetX: 0,
    background: 'transparent',
    
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
      enabled: false,
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

  formatNumberWithUnit(value: number): string {
    if(value!=null)
    {
      return value.toFixed(2) + " kWh";
    }
    else
    {
      return value;
    }
  }

  

  public tooltip: ApexTooltip = {
    theme:'dark',
    y: {
      formatter: (value: number) => this.formatNumberWithUnit(value)
    },
    style : {
      fontSize:'17px',

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
      style :{
        color:'#FFF',
        fontFamily: 'Montserrat,sans-serif',
        fontSize: '16px' 
      }
    },
    labels: {
      style: {
        colors: '#FFF',
        fontSize: '16px',
        fontFamily: 'Lato, sans-serif'
      }
    }
      
  };

  public yaxis: ApexYAxis = {
    title:{
      text:"Electric energy [kWh]",
      style :{
        color:this.titleColor,
        fontFamily: 'Montserrat,sans-serif',
        fontSize: '14px' 
      }
    },
    labels: {
      style: {
        colors: [this.yAxisColos],
        fontSize:'16px',
        fontFamily: 'Lato, sans-serif'
      },
    },
  };

  public title: ApexTitleSubtitle = {
    text: this.Title,
    style: {
      color: this.titleColor,
      fontSize: '19px',
      fontFamily: 'Montserrat'
    }
  };

  public stroke: ApexStroke = {
    curve: 'straight', //stepline
    width: 3,
    dashArray:[0,5,0,5,0,5],

  }




  public dataLabels: ApexDataLabels = {
    enabled:false,
    background: {
      foreColor: 'black',
      padding:12,
      opacity:1,
      borderRadius:5,
    },
    style: {

    fontSize:'14',
    
    fontWeight: 'normal'
  }
  
  }
}
