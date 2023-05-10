import { Component, OnInit,Input,OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
  ApexNoData,
} from 'ng-apexcharts';

@Component({
  selector: 'app-single-area-pie',
  templateUrl: './single-area-pie.component.html',
  styleUrls: ['./single-area-pie.component.css']
})
export class SingleAreaPieComponent implements OnChanges{
  @Input() chartHeight: number = 200;
  @Input() chartText: string = 'Info by suburbs in the week';
  @Input() Series: number[] = [40, 32, 52,30];
  @Input() chartLabels = ["Станово", "Град Крагујевац", "Виногради", "Others"];

  chartSeries: ApexNonAxisChartSeries = this.Series;

  ngOnChanges(changes: SimpleChanges) {
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

  

  chartTitle: ApexTitleSubtitle = {
    text:  this.chartText,
    align: 'left',
    style: {
      color: '#FFFFFF',
      fontSize: '19px',
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
    labels: {
      colors: '#FFFFFF',
    },
    markers:{
      fillColors:['#46c5f1', '#885ec0','#eb4886', '#f5805a'],
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
    series: this.chartSeries,
    chart: this.chartDetails,
    labels: this.chartLabels,
    title: this.chartTitle,
    dataLabels: this.chartDataLabels,
    legend: this.chartLegend,
    tooltip: this.tooltip,
    colors: ['#46c5f1', '#885ec0','#eb4886', '#f5805a'],
    noData: this.noData
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.chartDetails.height = '230px';
    this.chartTitle.text=this.chartText;
    this.chartSeries=this.Series;
  }
}
