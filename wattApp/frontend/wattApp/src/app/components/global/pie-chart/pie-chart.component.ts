import { Component, OnInit,Input} from '@angular/core';
import {
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexOptions,
  ApexLegend
} from 'ng-apexcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() chartHeight: number = 200;
  @Input() chartText: string = 'Total devices per room';
  @Input() Series: number[] = [40, 32, 28, 55];

  chartSeries: ApexNonAxisChartSeries = this.Series;

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    },
    height:this.chartHeight,
    width: '400'
  };

  chartLabels = ["Kitchen", "Living room", "Bathroom", "Other"]

  chartTitle: ApexTitleSubtitle = {
    text:  this.chartText,
    align: 'center',
    style: {
      color: '#FFFFFF'
    },
    
  };

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
    colors: ['#f4fafe', '#00E396', '#FEB019', '#FF4560'],
  };

  constructor() { }

  ngOnInit(): void {
    this.chartDetails.height = this.chartHeight;
    this.chartTitle.text=this.chartText;
    this.chartSeries=this.Series;
  }

}
