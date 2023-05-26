import { Component, OnInit,Input,OnChanges, SimpleChanges, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
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
  ApexTheme,
  ApexResponsive,
  ApexNoData,
} from 'ng-apexcharts';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-single-area-pie',
  templateUrl: './single-area-pie.component.html',
  styleUrls: ['./single-area-pie.component.css']
})
export class SingleAreaPieComponent implements OnChanges{
  hostElement: HTMLElement | undefined;
  colorTheme: string = "";
  @Input() chartHeight: number = 200;
  @Input() chartText: string = 'Info by suburbs in the week';
  @Input() Series: number[] = [40, 32, 52,30];
  @Input() chartLabels = ["Станово", "Град Крагујевац", "Виногради", "Others"];

  colors: string[] =  ['#46c5f1', '#885ec0','#eb4886', '#f5805a'];

  chartSeries: ApexNonAxisChartSeries = this.Series;

  constructor(private cdr: ChangeDetectorRef,private userService: UserService, private elementRef: ElementRef, private renderer: Renderer2) {

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
    if ('Series' in changes) {
      const hasData = this.Series.some((val) => val !== 0);
      if (!hasData) {
        this.chartSeries = [];
        this.noData.text = "There are no devices yet!";
      }
      else{
         
        this.chartSeries = this.Series;
      }
    }
    
    this.cdr.detectChanges();
  }

  chartDetails: ApexChart = {
    type: 'pie',
    offsetY:0,
    toolbar: {
      show: true,
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
      color: '#000',
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
    colors: ['#46c5f1', '#885ec0','#eb4886', '#f5805a'],
  }
  plotOptions: ApexPlotOptions = {
    pie :  {
      startAngle: -90,
      endAngle: 270,
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
    theme:"dark",
    marker: {
      show:false,
      fillColors:['#46c5f1', '#885ec0','#eb4886', '#f5805a'],
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
    labels : {
      colors: this.colorTheme,
    },
    
    markers:{
      fillColors:['#46c5f1', '#885ec0','#eb4886', '#f5805a'],
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
    series: this.chartSeries,
    chart: this.chartDetails,
    labels: this.chartLabels,
    dataLabels: this.chartDataLabels,
    tooltip: this.tooltip,
    colors: ['#46c5f1', '#885ec0','#eb4886', '#f5805a'],
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

    this.chartDetails.height = '230px';
    this.chartTitle.text=this.chartText;
    this.chartSeries=this.Series;
  }
}
