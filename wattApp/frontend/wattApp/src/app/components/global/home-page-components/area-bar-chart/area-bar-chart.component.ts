import { Component, OnInit,Input, SimpleChanges, OnChanges, ElementRef, Renderer2 } from '@angular/core';
import {  ApexAxisChartSeries,ApexFill, ApexTooltip,ApexPlotOptions, ApexStroke,ApexLegend, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis, ApexNonAxisChartSeries } from 'ng-apexcharts';

@Component({
  selector: 'app-area-bar-chart',
  styleUrls: ['./area-bar-chart.component.css'],
  template: '<apx-chart [series]="series" [tooltip]="tooltip" [plotOptions]="plotOptions" [stroke]="stroke"  [legend]="legend" [fill]="fill" [chart]="chart" [xaxis]="xaxis" [yaxis]="yaxis" [title]="title"></apx-chart>',
})
export class AreaBarChartComponent implements OnInit, OnChanges {
  @Input() seriesData: number[] = [40, 32, 28];
  hostElement: HTMLElement | undefined;
  colorTheme: string = "";

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }
  
  public series: ApexAxisChartSeries = [
    {
      name: 'Resorce',
      data: this.seriesData,
    },
  ];
  ngOnChanges(changes: SimpleChanges): void {
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
        colors: [this.colorTheme],
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

  ngOnInit(): void {
    
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    this.hostElement?.classList.toggle('light-theme-bigger-shadow', true);
    this.hostElement?.classList.add('light-theme-background-white');

    this.colorTheme = '#000';

    this.series = [
      {
        name: 'Resource',
        data: this.seriesData,
      },
    ];
    console.log(this.seriesData);
  }
}