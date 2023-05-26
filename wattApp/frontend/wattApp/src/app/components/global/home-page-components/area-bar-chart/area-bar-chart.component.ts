import { Component, OnInit,Input, SimpleChanges, OnChanges, ElementRef, Renderer2 } from '@angular/core';
import {  ApexAxisChartSeries,ApexFill, ApexTooltip,ApexPlotOptions, ApexStroke,ApexLegend, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-area-bar-chart',
  styleUrls: ['./area-bar-chart.component.css'],
  template: '<apx-chart [series]="series" [tooltip]="tooltip" [plotOptions]="plotOptions" [stroke]="stroke"  [legend]="legend" [fill]="fill" [chart]="chart" [xaxis]="xaxis" [yaxis]="yaxis" [title]="title"></apx-chart>',
})
export class AreaBarChartComponent implements OnInit, OnChanges {
  @Input() seriesData: number[] = [40, 32, 28];
  hostElement: HTMLElement | undefined;
  colorTheme: string = "";

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private userService: UserService) {

  }
  
  public series: ApexAxisChartSeries = [
    {
      name: 'Resorce',
      data: this.seriesData,
    },
  ];
  ngOnChanges(changes: SimpleChanges): void {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
     if(dark) {
      this.title = this.title3;
      this.yaxis = this.yaxis3;
     }
     else {
      this.title = this.title2;
      this.yaxis = this.yaxis2;
     }
    });

    if ('seriesData' in changes) {
      this.ngOnInit();
      this.series = [
        {
          name: 'Resource',
          data: this.seriesData,
        },
      ];
    }
  }


  public chart: ApexChart = {
    type: 'bar',
    height: 250,
    width: '100%',

    
    redrawOnParentResize:true,
    redrawOnWindowResize:true
  };
  public xaxis: ApexXAxis = {
    categories: ['Producers', 'Consumers', 'Stock'],
    offsetY: 10,
    labels: {
      style: {
        colors: ['#46c5f1', '#885ec0','#eb4886', '#f5805a'],
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
    colors: ['#46c5f1', '#885ec0','#eb4886', '#f5805a'],
    
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
        colors: ['#000'],
      },
    },
  };

  public yaxis2: ApexYAxis = {
    labels: {
      style: {
        colors: ['#000'],
      },
    },
  };
  public yaxis3: ApexYAxis = {
    labels: {
      style: {
        colors: ['#FFF'],
      },
    },
  };

  public plotOptions: ApexPlotOptions = {
    bar : {
      borderRadius: 10,
      columnWidth: '40%',
      distributed:true,
      borderRadiusWhenStacked: 'last',
    }
  }

  public title: ApexTitleSubtitle = {
    text: 'Devices comparison',
    style: {
      color: this.colorTheme,
      fontSize: '19px',
      fontFamily: 'Montserrat',
    }
  };

  public title2: ApexTitleSubtitle = {
    text: 'Devices comparison',
    style: {
      color: '#000',
      fontSize: '19px',
      fontFamily: 'Montserrat',
    }
  };

  public title3: ApexTitleSubtitle = {
    text: 'Devices comparison',
    style: {
      color: '#FFF',
      fontSize: '19px',
      fontFamily: 'Montserrat',
    }
  };

  ngOnInit(): void {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-2', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
     if(dark) {
      this.title = this.title3;
      this.yaxis = this.yaxis3;
     }
     else {
      this.title = this.title2;
      this.yaxis = this.yaxis2;
     }
    });
    this.series = [
      {
        name: 'Resource',
        data: this.seriesData,
      },
    ];
    console.log(this.seriesData);
  }
}