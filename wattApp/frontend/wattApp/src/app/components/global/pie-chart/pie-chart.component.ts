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
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  chartSeries: ApexNonAxisChartSeries = [40, 32, 28, 55];

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  };

  chartLabels = ["Kitchen", "Living room", "Bathroom", "Other"]

  chartTitle: ApexTitleSubtitle = {
    text: 'Total devices per room',
    align: 'center',
    style: {
      color: '#FFFFFF'
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
