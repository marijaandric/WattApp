import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { UserService } from 'src/app/services/user/user.service';
import {  ApexAxisChartSeries,ApexDataLabels,ApexLegend,ApexMarkers, ApexTooltip, ApexStroke, ApexFill, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis, ApexNonAxisChartSeries, ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DatasComponent implements OnInit{
  @ViewChild('chart2') chart2!: ChartComponent;
  loader=true;
  datas! :any[];
  datas2! :any[];
  datas3! :any[];
  datas4! :any[];
  datas5! :any[];
  datas6! :any[];
  category: any[] = [1,2,3]
  niz1:any[] = [1,2,3]
  niz2:any[] = [1,2,3]
  lightMode = true
  private map!: L.Map;
  countryCode = "SRB"

  dark = true;

  titleColor: string = "";
  themeChart: string = "";
  yAxisColos: string = "";

  constructor(private http: HttpClient,private userService:UserService, private elementRef: ElementRef) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
      this.ngOnChanges()
    });
    
    const apiKey = 'RFK5GqIiuhLO4oh7ka1d6T9XziQeQEmAIxjVZ6uJ';
    let apiUrl = 'https://api.eia.gov/v2/international/data/?frequency=annual&data[0]=value&facets[activityId][]=1&facets[productId][]=44&facets[countryRegionId][]='+this.countryCode+'&facets[unit][]=QBTU&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=' + apiKey;
    let apiUrl2 = 'https://api.eia.gov/v2/international/data/?frequency=annual&data[0]=value&facets[activityId][]=2&facets[productId][]=44&facets[countryRegionId][]='+this.countryCode+'&facets[unit][]=QBTU&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=' + apiKey;
    let apiUrl3 = 'https://api.eia.gov/v2/international/data/?frequency=annual&data[0]=value&facets[activityId][]=3&facets[productId][]=2&facets[countryRegionId][]=SRB&facets[unit][]=BKWH&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&start=2020&end=2021&api_key=' + apiKey;
    let apiUrl4 = 'https://api.eia.gov/v2/international/data/?frequency=annual&data[0]=value&facets[activityId][]=4&facets[productId][]=2&facets[countryRegionId][]=SRB&facets[unit][]=BKWH&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&start=2020&end=2021&api_key=' + apiKey;
    let apiUrl5 = 'https://api.eia.gov/v2/international/data/?frequency=annual&data[0]=value&facets[activityId][]=33&facets[productId][]=47&facets[countryRegionId][]=SRB&facets[unit][]=MBTUPP&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&start=2020&end=2021&api_key=' + apiKey;
    let apiUrl6 = 'https://api.eia.gov/v2/international/data/?frequency=annual&data[0]=value&facets[activityId][]=8&facets[productId][]=4008&facets[countryRegionId][]=SRB&facets[unit][]=MMTCD&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&start=2020&end=2021&api_key=' + apiKey;

    this.http.get(apiUrl).subscribe((data:any) => {
       this.datas = data.response.data.slice(0, 15) 
       this.niz1 = this.datas
      .slice(0, 15) 
      .map(obj => obj.value === "--" ? null : parseFloat(obj.value).toFixed(2));

       this.category = this.datas
       .slice(0, 15) 
       .map(obj => obj.period === "--" ? null : parseFloat(obj.period));
     
       this.series[0].data = this.niz1;
       this.xaxis.categories = this.category
       this.ngOnChanges()
       this.loader = false
     }, (error) => {
       console.error(error); 
       this.loader = false
    });
    this.http.get(apiUrl2).subscribe(
      (data: any) => {
        this.datas2 = data.response.data.slice(0, 15) ;
        this.niz2 = this.datas2
        .slice(0, 15) 
        .map(obj => obj.value === "--" ? null : parseFloat(obj.value).toFixed(2));
        this.series[1].data = this.niz2;
        this.ngOnChanges()
        this.loader = false
      },
      (error) => {
        console.error(error);
        this.loader = false
      }
    );
    this.http.get(apiUrl3).subscribe(
      (data: any) => {
        this.datas3 = data.response.data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.http.get(apiUrl4).subscribe(
      (data: any) => {
        this.datas4 = data.response.data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.http.get(apiUrl5).subscribe(
      (data: any) => {
        this.datas5 = data.response.data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.http.get(apiUrl6).subscribe(
      (data: any) => {
        this.datas6 = data.response.data;
        console.log(this.datas6);
        
      },
      (error) => {
        console.error(error);
      }
    );
    
  }





  public series: ApexAxisChartSeries = [
    {
      name: 'Production',
      data: this.niz1,
      color: '#885ec0'
      
    },
    {
      name: "Consumption",
      data: this.niz2,
      color: '#46c5f1'
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
    type: 'bar',
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
      return value.toFixed(2) + " BkWh";
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
      text:"15 years",
      style :{
        color:'#FFF',
        fontFamily: 'Montserrat,sans-serif',
        fontSize: '16px' 
      }
    },
    categories: this.category,
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
      text:"Electric energy [BkWh]",
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
    text: "Consumption and production in Serbia",
    style: {
      color: this.titleColor,
      fontSize: '19px',
      fontFamily: 'Montserrat'
    }
  };

  public stroke: ApexStroke = {
    curve: 'straight', //stepline
    width: 3,
    

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

  hostElement: HTMLElement | undefined;
  ngOnChanges() {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
      this.dark = dark;

      if(this.dark == true)
      {

        this.series = this.series
        this.xaxis = {
          title:{
            text: "15 years",
            style :{
              color: '#FFF',
              fontFamily: 'Montserrat,sans-serif',
              fontSize: '16px' 
            }
          },
          categories: this.category,
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
            text:"Electric energy [BkWh]",
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
          text: "Consumption and production in Serbia",
          style: {
            color: '#FFF',
            fontSize: '19px',
            fontFamily: 'Montserrat'
          }
        };
      }
      else {
        this.series = this.series
        this.xaxis = {
          title:{
            text: "15 years",
            style :{
              color: '#000',
              fontFamily: 'Montserrat,sans-serif',
              fontSize: '16px' 
            }
          },
          categories: this.category,
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
            text:"Electric energy [BKWh]",
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
          text: "Consumption and production in Serbia",
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



  
}
