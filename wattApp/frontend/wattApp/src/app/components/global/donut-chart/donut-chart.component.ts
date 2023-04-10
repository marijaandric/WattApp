import { Component, OnInit,Input} from '@angular/core';
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
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
  @Input() chartHeight: number = 200;
  @Input() chartText: string = 'Total devices per room';
  @Input() Series: number[] = [40, 32, 28, 55];

  chartSeries: ApexNonAxisChartSeries = this.Series;

  chartDetails: ApexChart = {
    type: 'donut',
    offsetY:0,
    toolbar: {
      show: true
    },
    width:'100%',
    redrawOnParentResize:false,
    redrawOnWindowResize:false,
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

  chartLabels = ["Kitchen", "Living room", "Bathroom",  "Other"]

  chartTitle: ApexTitleSubtitle = {
    text:  this.chartText,
    align: 'center',
    style: {
      color: '#FFFFFF'
    },
    
  };
  stroke: ApexStroke = {
    show:false
  }

  fill: ApexFill = {
    colors: ['#7d02d4', '#d90372', 'rgb(4, 167, 119)','#F75C03'],
  }
  plotOptions: ApexPlotOptions = {
    pie :  {
      startAngle: -90,
      endAngle: 270,
      customScale: 1.2,
      offsetX:0,
      offsetY:60,
    }
  }

  tooltip:ApexTooltip = {
    enabled:true,
    fillSeriesColor: false,
    
    marker: {
      show:false,
      fillColors:['#7d02d4', '#d90372', 'rgb(4, 167, 119)', '#F75C03'],
    }
  }
  chartDataLabels: ApexDataLabels = {
    enabled: true,
  };

  chartLegend: ApexLegend = {
    position: 'right',
    offsetY: 40,
    offsetX: -30,
    labels: {
      colors: '#FFFFFF',
    },
    markers:{
      fillColors:['#7d02d4', '#d90372', 'rgb(4, 167, 119)', '#F75C03'],
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
    colors: ['#7d02d4', '#d90372', 'rgb(4, 167, 119)', '#F75C03'],
  };

  constructor() { }

  ngOnInit(): void {
    this.chartDetails.height = '175.5%';
    this.chartTitle.text=this.chartText;
    this.chartSeries=this.Series;
  }
}