import { Component, OnChanges,OnInit,Input, SimpleChanges, ElementRef, Renderer2, ChangeDetectorRef} from '@angular/core';
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
  ApexNoData,
} from 'ng-apexcharts';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnChanges {
  
  hostElement: HTMLElement | undefined;
  colorTheme: string = "";
  @Input() chartHeight: number = 200;
  @Input() chartText: string = 'Total devices per room';
  @Input() Series: number[] = [40, 32, 28, 55,23,43];
  @Input() chartLabels : string[] = ["Kitchen", "Living room", "Bathroom",  "Other"]

  chartSeries: ApexNonAxisChartSeries = this.Series;

  chartDetails: ApexChart = {
    type: 'pie',
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
      color: '#000',
      opacity: 0.9
  }
  };

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
      offsetY:40,
    }
    
  }

  tooltip:ApexTooltip = {
    enabled:true,
    fillSeriesColor: false, 
    theme:'dark',
    style: {
      fontSize:'16px',
      fontFamily: 'Lato, sans-serif',
    },
    marker: {
      show:false,
      fillColors:['#46c5f1', '#885ec0','#eb4886', '#f5805a']
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

  chartOptions: ApexOptions = {
    series: this.chartSeries,
    chart: this.chartDetails,
    labels: this.chartLabels,
    dataLabels: this.chartDataLabels,
    colors: ['#46c5f1', '#885ec0','#eb4886', '#f5805a'],
    tooltip: this.tooltip
  };

  constructor(private cdr: ChangeDetectorRef,private elementRef: ElementRef, private renderer: Renderer2, private userService: UserService) { }

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
     }
     else {
      this.chartLegend = this.chartLegend3;
      this.chartTitle = this.chartTitle3;
     }
    });
    this.chartDetails.height = '250px';
    this.chartTitle.text=this.chartText;
    this.chartSeries=this.Series;
  }
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

  ngOnChanges(changes: SimpleChanges) {
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
    if ('Series' in changes) {
      console.log(this.Series);
      const hasData = this.Series.some((val) => val !== 0);
      if (!hasData || this.Series.length == 0) {

        this.chartSeries = [];
        this.noData.text = "There are no devices yet!";
        console.log('usao2');
      }
      else{
         
        this.chartSeries = this.Series;
   
      }
    }
    this.cdr.detectChanges();
  }
}
