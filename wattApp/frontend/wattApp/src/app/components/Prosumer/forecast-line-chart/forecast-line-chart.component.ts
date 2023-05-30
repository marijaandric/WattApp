import { style } from '@angular/animations';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  ApexAxisChartSeries,ApexDataLabels,ApexLegend,ApexMarkers, ApexTooltip, ApexStroke, ApexFill, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-forecast-line-chart',
  templateUrl: './forecast-line-chart.component.html',
  styleUrls: ['./forecast-line-chart.component.css']
})
export class ForecastLineChartComponent implements OnChanges{
  menageUserForm! : FormGroup;
  hostElement: HTMLElement | undefined;
  cities: City[];
  selectedCity!: City;
  dark: Boolean = true;

  @Input() array : any[]  = [12.00, 19.00, 33.00, 5.00, 2.00, 6.00, 5.00]
  @Input() array2 : any[] = [null,null, null, null, null, null,5.00,10.00,12.00,23.00,16.00,5.00,10.00,5.00]
  @Input() array3 : any[] = [null,null, null, null, null, null,null]
  @Input() boja1 = '#88dbf6';
  @Input() Period = '#46c5f1';

  constructor(private userService:UserService, private authService:AuthService, private elementRef: ElementRef) {
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
  }
  ngOnChanges(changes: SimpleChanges)
  {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
      this.dark = dark;

      if(this.dark)
      {
        this.xaxis = {
          title:{
            text:this.Period,
            style :{
              color:'white',
              fontFamily: 'Montserrat,sans-serif',
              fontSize: '16px' 
            }
          },
          categories: [this.array2[0],this.array2[1],this.array2[2],this.array2[3],this.array2[4],this.array2[5],this.array2[6],this.array2[7]],
          labels: {
            style: {
              colors: '#FFF',
              fontSize: '16px',
              fontWeight: 'bolder',
              fontFamily: 'Lato, sans-serif'
            }
          }
        };
        
      this.yaxis = {
        title:{
          text:"Electric energy [kWh]",
          style :{
            color:'white',
            fontFamily: 'Montserrat,sans-serif',
            fontSize: '14px' 
          }
        },
        labels: {
          style: {
            colors: '#FFF',
            fontSize:'16px',
            fontWeight:'bold',
            fontFamily: 'Lato, sans-serif'
          },
        },
      };
      this.title = {
        text: 'Forecast',
        style: {
          color: '#FFF',
          fontSize: '19px',
          fontFamily: 'Montserrat'
        }
      };
      } else {
        this.title = {
          text: 'Forecast',
          style: {
            color: '#000',
            fontSize: '19px',
            fontFamily: 'Montserrat'
          }
        };
        this.xaxis = {
          title:{
            text:this.Period,
            style :{
              color:'#000',
              fontFamily: 'Montserrat,sans-serif',
              fontSize: '16px' 
            }
          },
          categories: [this.array2[0],this.array2[1],this.array2[2],this.array2[3],this.array2[4],this.array2[5],this.array2[6],this.array2[7]],
          labels: {
            style: {
              colors: '#000',
              fontSize: '16px',
              fontWeight: 'bolder',
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
            fontWeight:'bold',
            fontFamily: 'Lato, sans-serif'
          },
        },
      };
      }

      this.series = [
        {
          name: 'Forecast',
          data: this.array,
          color: this.boja1,
          
        }
      ];
      
      const options = {
        series: this.series,
      };
  
      const chart2 = new ApexCharts(document.querySelector("#chart2"), options);
      chart2.render();
    });
    
  }


  public series: ApexAxisChartSeries = [
    {
      name: "Forecast",
      data: this.array,
      color: '#ab36ff',
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
    height: 250,
    width: '100%',
    offsetX: 0,
    background: 'transparent',
    
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
          enabled: false,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    },
    redrawOnParentResize: false,
    redrawOnWindowResize: false,
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
      useSeriesColors:true
    },
    
  }

  public fill: ApexFill = {
    // type: 'gradient',
    // gradient: {
    //   shade: 'dark',
    //   gradientToColors: ['#7d02d4', '#d90372','rgb(4, 167, 119)'],
    //   shadeIntensity: 1,
    //   opacityFrom: 1,
    //   opacityTo: 1,
    //   stops: [0, 100, 200],
    // }
  }

  public xaxis: ApexXAxis = {
    title:{
      text:"period",
      style :{
        color:'white',
        fontFamily: 'Montserrat,sans-serif',
        fontSize: '16px' 
      }
    },
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
    title:{
      text:"Electric energy [kWh]",
      style :{
        color:'white',
        fontFamily: 'Montserrat,sans-serif',
        fontSize: '14px' 
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
    enabled:false
  // textAnchor: 'middle',
  // distributed: true,
  // offsetX: 0,
  // offsetY: 0,
  // style: {
  //     fontSize: '20px',
  //     fontFamily: 'Helvetica, Arial, sans-serif',
  //     fontWeight: 'bold',
  //     colors: ['#222222',]
  // },
  // background: {
  //   enabled: true,
  //   foreColor: '#FFF',
  //   padding: 10,
  //   borderRadius: 2,
  //   borderWidth: 1,
  //   borderColor: '#fff',
  //   opacity: 0.9,
  //   dropShadow: {
  //     enabled: true,
  //     top: 1,
  //     left: 1,
  //     blur: 1,
  //     color: '#222222',
  //     opacity: 1
  //   }
  // },
  // dropShadow: {
  //     enabled: false,
  //     top: 1,
  //     left: 1,
  //     blur: 1,
  //     color: '#000',
  //     opacity: 0.45
  // },
  
  }
}
