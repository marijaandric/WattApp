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
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-all-areas-donut',
  templateUrl: './all-areas-donut.component.html',
  styleUrls: ['./all-areas-donut.component.css']
})
export class AllAreasDonutComponent implements OnChanges{
  hostElement: HTMLElement | undefined;
  colorTheme: string = "";
  lightMode: Boolean = true;
  @Input() chartHeight: number = 200;
  @Input() chartText: string = 'Станово';
  @Input() Series: number[] = [0, 0, 0];
  chartLabels = ["Consumption", "Prodaction", "Stock"];

  chartSeries: ApexNonAxisChartSeries = this.Series;

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, private renderer: Renderer2, private userService: UserService) {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
     if(dark) {
      console.log(dark);
      this.chartLegend = this.chartLegend2;
      this.chartTitle = this.chartTitle2;
      this.noData = this.noData2;
     }
     else {
      console.log(dark);
      this.chartLegend = this.chartLegend3;
      this.chartTitle = this.chartTitle3;
      this.noData = this.noData3;
     }
    });

    this.chartTitle.text=this.chartText;

    this.chartTitle=this.chartTitle;

    this.chartDetails.height = '220px';
    this.chartSeries=this.Series;
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
      this.chartTitle = { text: 'Weekly report for: ' + this.chartText,
        style: {
          color: this.colorTheme,
          fontSize: '17px',
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
      color: 'red',
      fontSize: '19px',
      fontFamily:'Montserrat',
      fontWeight:'bold'  
    },
    
  };
  
  chartTitle2: ApexTitleSubtitle = {
    text:  this.chartText,
    align: 'left',
    style: {
      color: '#FFF',
      fontSize:  '19px',
      fontFamily:'Montserrat',
      fontWeight:'bold'  
    },
    
  };
  chartTitle3: ApexTitleSubtitle = {
    text:  this.chartText,
    align: 'left',
    style: {
      color: '#000',
      fontSize:  '19px',
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
  formatNumberWithUnit(value: number): string {
    return value.toFixed(2) + " kWh";
  }

  tooltip:ApexTooltip = {
    enabled:true,
    y: {
      formatter: (value: number) => this.formatNumberWithUnit(value)
    },
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
      colors:['blue'],
    },
    markers:{
      fillColors:['#46c5f1', '#885ec0','#eb4886'
    ]
    }
  };

  chartLegend2: ApexLegend = {
    position: 'right',
    offsetY: 50,
    offsetX: -40,
    
    fontSize:'12px',
    fontWeight:'bold',
    fontFamily: 'Montserrat, sans-serif',
    labels: {
      colors:['#FFF'],
    },
    markers:{
      fillColors:['#46c5f1', '#885ec0','#eb4886'
    ]
    }
  };
  
  chartLegend3: ApexLegend = {
    position: 'right',
    offsetY: 50,
    offsetX: -40,
    
    fontSize:'12px',
    fontWeight:'bold',
    fontFamily: 'Montserrat, sans-serif',
    labels: {
      colors:['#000'],
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
      color: this.colorTheme
    }
  }

  noData2: ApexNoData = {
    text: 'No data available',
    align: 'left',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      fontSize: '12px',
      color: '#FFF'
    }
  }

  noData3: ApexNoData = {
    text: 'No data available',
    align: 'left',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      fontSize: '12px',
      color: '#000'
    }
  }

  chartOptions: ApexOptions = {
    series: this.Series,
    chart: this.chartDetails,
    labels: this.chartLabels,
    dataLabels: this.chartDataLabels,
    tooltip: this.tooltip,
    colors: ['#46c5f1', '#885ec0','#eb4886'],
    responsive: [this.responsive]
  };


  async ngOnInit(): Promise<void> {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
     if(dark) {
      this.chartLegend = this.chartLegend2;
      this.chartTitle = this.chartTitle2;
      this.noData = this.noData2;
     }
     else {
      this.chartLegend = this.chartLegend3;
      this.chartTitle = this.chartTitle3;
      this.noData = this.noData3;
     }
    });

    this.chartTitle.text=this.chartText;

    this.chartTitle=this.chartTitle;

    this.chartDetails.height = '220px';
    this.chartSeries=this.Series;
  }
}
