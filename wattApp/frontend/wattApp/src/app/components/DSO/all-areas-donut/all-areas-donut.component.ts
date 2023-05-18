import { Component, OnInit,Input,OnChanges, SimpleChanges, DoCheck, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import {
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexOptions,
  ApexLegend,
  ApexPlotOptions,
  ApexFill,
  ApexStroke,
  ApexTooltip,
  ApexResponsive,
  ApexNoData,
} from 'ng-apexcharts';

@Component({
  selector: 'app-all-areas-donut',
  templateUrl: './all-areas-donut.component.html',
  styleUrls: ['./all-areas-donut.component.css']
})
export class AllAreasDonutComponent implements OnChanges{
  hostElement: HTMLElement | undefined;
  colorTheme: string = "";
  @Input() chartHeight: number = 200;
  @Input() chartText: string = 'Станово';
  @Input() Series: number[] = [0, 0, 0];
  chartLabels = ["Consumption", "Prodaction", "Stock"];

  chartSeries: ApexNonAxisChartSeries = this.Series;

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnChanges(changes: SimpleChanges) {
    
    if('Series' in changes)
    {
      this.chartSeries = this.Series;
      const hasData = this.Series.some((val) => val !== 0);
      if (!hasData) {
        this.chartSeries = [];
        this.noData.text = "There are no devices yet!";
        this.chartLabels = [];
      }
      else{
        this.chartSeries = this.Series;
        this.chartLabels = ["Consumption", "Prodaction", "Stock"];
      }
      //changes['Series'].currentValue
    }
      
    if ('chartText' in changes) {
      this.chartTitle = { text: this.chartText,
        style: {
          color: this.colorTheme,
          fontSize: '19px',
          fontFamily:'Montserrat',
          fontWeight:'bold'  
        }, };
    }
    if ('chartHeight' in changes) {
      this.chartDetails.height = this.chartHeight;
    }
    
    this.cdr.detectChanges();
    
  }


  chartDetails: ApexChart = {
    type: 'donut',
    offsetY:0,
    toolbar: {
      show: true
    },
    width:'100%',
    redrawOnParentResize:true,
    redrawOnWindowResize:true,
    
    dropShadow: {
      enabled: true,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 1,
      color: this.colorTheme,
      opacity: 0.9
  }
  };

  responsive: ApexResponsive = {
    breakpoint: 1700,
    options: {
      legend: {
        position:"bottom"
      }
    }
  }

  chartTitle: ApexTitleSubtitle = {
    text:  this.chartText,
    align: 'left',
    style: {
      color: this.colorTheme,
      fontSize: '19px',
      fontFamily:'Montserrat',
      fontWeight:'bold'  
    },
    
  };
  stroke: ApexStroke = {
    show:false
  }

  fill: ApexFill = {
    colors: ['#46c5f1', '#885ec0','#eb4886'],

  }
  plotOptions: ApexPlotOptions = {
    pie :  {
      startAngle: 180,
      endAngle: -180,
      customScale: 1,
      offsetX:-10,
      offsetY:20,
    }
  }

  tooltip:ApexTooltip = {
    enabled:true,
    fillSeriesColor: false,

    style: {
      fontSize:'16px',
      fontFamily: 'Lato, sans-serif',
    },  
    marker: {
      show:false,
      fillColors:['#46c5f1', '#885ec0','#eb4886'],
    }
  }
  chartDataLabels: ApexDataLabels = {
    enabled: true,
  };

  chartLegend: ApexLegend = {
    position: 'right',
    offsetY: 50,
    offsetX: -40,
    
    fontSize:'12px',
    fontWeight:'bold',
    fontFamily: 'Montserrat, sans-serif',
    labels: {
      colors:this.colorTheme,
    },
    markers:{
      fillColors:['#46c5f1', '#885ec0','#eb4886'
    ]
    }
  };

  noData: ApexNoData = {
    text: 'No data available',
    align: 'left',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      fontSize: '12px',
      color: '#fff'
    }
  }

  chartOptions: ApexOptions = {
    series: this.Series,
    chart: this.chartDetails,
    labels: this.chartLabels,
    title: this.chartTitle,
    dataLabels: this.chartDataLabels,
    legend: this.chartLegend,
    tooltip: this.tooltip,
    colors: ['#46c5f1', '#885ec0','#eb4886'],
    noData: this.noData,
    responsive: [this.responsive]
  };


  ngOnInit(): void {

    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    this.hostElement?.classList.toggle('light-theme-bigger-shadow', true);
    this.hostElement?.classList.add('light-theme-background-white');

    this.colorTheme = '#000';


    this.chartDetails.height = '220px';
    this.chartTitle.text=this.chartText;
    this.chartSeries=this.Series;
    this.chartLegend=this.chartLegend;
  }
}
