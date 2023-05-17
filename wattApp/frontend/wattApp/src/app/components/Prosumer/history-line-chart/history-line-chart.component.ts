import { style } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class HistoryLineChartComponent implements OnChanges{
  menageUserForm! : FormGroup;
  cities: City[];
  selectedCity!: City;

  @Input() array : any[]  = [12.00, 19.00, 33.00, 5.00, 2.00, 6.00, 5.00]
  @Input() array2 : any[] = [null,null, null, null, null, null,5.00,10.00,12.00,23.00,16.00,5.00,10.00,5.00]
  @Input() array3 : any[] = [null,null, null, null, null, null,null]
  @Input() boja1 = '#46c5f1';



  constructor(private userService:UserService, private authService:AuthService) {
    this.cities = [
      {name: 'Consumption', code: '1'},
      {name: 'Production', code: '2'},
      {name: 'Stock', code: '3'},
      {name: 'All', code: '4'},
  ];
  }

  ngOnChanges(changes: SimpleChanges)
  {

    this.series = [
      {
        name: 'History',
        data: this.array,
        color: this.boja1,
        
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
      categories: [this.array2[0],this.array2[1],this.array2[2],this.array2[3],this.array2[4],this.array2[5],this.array2[6]],
      labels: {
        style: {
          colors: ['#FFF','#FFF','#FFF','#FFF','#FFF','#FFF','#FFF'],
          fontSize: '16px',
          fontWeight: 'bolder',
          fontFamily: 'Lato, sans-serif'
        }
      }
    };
  }



  public series: ApexAxisChartSeries = [
    {
      name: 'History',
      data: this.array,
      color: '#7d02d4'
    }
      
  ];

  public marker: ApexMarkers = {
    
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
      text:"kWh",
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

  public fill: ApexFill = {
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
    curve: 'smooth',
    width: 3,
  }

  public dataLabels: ApexDataLabels = {
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
