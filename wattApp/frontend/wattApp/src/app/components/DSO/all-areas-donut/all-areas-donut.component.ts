import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
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
} from 'ng-apexcharts';

@Component({
  selector: 'app-all-areas-donut',
  templateUrl: './all-areas-donut.component.html',
  styleUrls: ['./all-areas-donut.component.css']
})
export class AllAreasDonutComponent {
  @Input() chartHeight: number = 200;
  @Input() chartText: string = 'Станово';
  @Input() Series: number[] = [55, 32, 28];
  @Input() chartLabels = ["Consumption", "Prodaction", "Stock"];

  chartSeries: ApexNonAxisChartSeries = this.Series;

  ngOnChanges(changes: SimpleChanges) {
    if ('Series' in changes) {
      this.chartSeries = this.Series;
    }
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
      blur: 3,
      color: '#000',
      opacity: 0.7
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
      startAngle: 180,
      endAngle: -180,
      customScale: 1,
      offsetX:-10,
      offsetY:40,
    }
  }

  tooltip:ApexTooltip = {
    enabled:true,
    fillSeriesColor: false,
    style: {
      fontSize:'16px',
      fontFamily: 'Lato, sans-serif'
    },  
    marker: {
      show:true,
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
      fillColors:['#46c5f1', '#885ec0','#eb4886', '#f5805a']
    }
  };

  chartOptions: ApexOptions = {
    series: this.chartSeries,
    chart: this.chartDetails,
    labels: this.chartLabels,
    title: this.chartTitle,
    dataLabels: this.chartDataLabels,
    legend: this.chartLegend,
    tooltip: this.tooltip,
    colors: ['#46c5f1', '#885ec0','#eb4886', '#f5805a']
  };

  constructor() { }

  ngOnInit(): void {
    this.chartDetails.height = '210px';
    this.chartTitle.text=this.chartText;
    this.chartSeries=this.Series;
  }
}
