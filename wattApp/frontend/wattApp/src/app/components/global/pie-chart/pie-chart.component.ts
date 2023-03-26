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
  ApexStroke
} from 'ng-apexcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() chartHeight: number = 200;
  @Input() chartText: string = 'Total devices per room';
  @Input() Series: number[] = [40, 32, 28, 55,23,43];

  chartSeries: ApexNonAxisChartSeries = this.Series;

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    },
    height:this.chartHeight,
    width: '400',
    redrawOnParentResize:true,
    redrawOnWindowResize:true
  };

  chartLabels = ["Kitchen", "Living room", "Bathroom", "Garden", "Working room", "Other"]

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
    colors: ['#7d02d4', '#d90372', 'rgb(4, 167, 119)','#ff7bbf', '#ab36ff','rgb(114, 255, 213)']
  }
  plotOptions: ApexPlotOptions = {
    pie :  {
      startAngle: -90,
      endAngle: 270
    }
  }

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };

  chartLegend: ApexLegend = {
    position: 'right',
    offsetY: 0,
    labels: {
      colors: '#FFFFFF'
    }
  };

  chartOptions: ApexOptions = {
    series: this.chartSeries,
    chart: this.chartDetails,
    labels: this.chartLabels,
    title: this.chartTitle,
    dataLabels: this.chartDataLabels,
    legend: this.chartLegend,
    colors: ['#7d02d4', '#d90372', 'rgb(4, 167, 119)','#ff7bbf', '#ab36ff','rgb(114, 255, 213)'],
  };

  constructor() { }

  ngOnInit(): void {
    this.chartDetails.height = this.chartHeight;
    this.chartTitle.text=this.chartText;
    this.chartSeries=this.Series;
  }

}
