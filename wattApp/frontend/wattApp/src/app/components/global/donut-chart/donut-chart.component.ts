import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexOptions,
  ApexLegend
} from 'ng-apexcharts';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {

  chartSeries: ApexNonAxisChartSeries = [80, 32, 28];

  chartDetails: ApexChart = {
    type: 'donut',
    toolbar: {
      show: true
    }
  };

  chartLabels = ["Carbon", "Green energy", "Own energy"]
  
  chartTitle: ApexTitleSubtitle = {
    text: 'Energy type',
    align: 'center',
    style: {
      color: '#FFFFFF',
      fontSize: '20px'
    }
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
    colors: ['#f4fafe', '#00E396', '#FEB019', '#FF4560']
  };

  constructor() { }

  ngOnInit(): void {
  }

}

