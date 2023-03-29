import { Component, OnInit,Input } from '@angular/core';
import { ApexAxisChartSeries ,ApexFill, ApexTooltip, ApexPlotOptions, ApexStroke, ApexLegend, ApexChart, ApexXAxis, ApexTitleSubtitle,ApexYAxis } from 'ng-apexcharts';

@Component({
  selector: 'app-device-area-bar-chart',
  styleUrls: ['./device-area-bar-chart.component.css'],
  templateUrl: './device-area-bar-chart.component.html'
})
export class DeviceAreaBarChartComponent implements OnInit {
  series!: ApexAxisChartSeries;
  chart!: ApexChart;
  xaxis!: ApexXAxis;  
  stroke!: ApexStroke;
  legend!: ApexLegend;
  fill!: ApexFill;
  tooltip!: ApexTooltip;
  yaxis!: ApexYAxis;
  plotOptions!: ApexPlotOptions;
  title!: ApexTitleSubtitle;

  ngOnInit(): void {
    this.loadPlaceholders();
  }

  private loadPlaceholders(){
    this.series = [
      {
        name: 'Resorce',
        data: [120, 39, 32, 150, 68, 70, 80],
      },
    ];

    this.chart = {
      type: 'bar',
      height: 250,
      width: '100%',
      redrawOnParentResize:true,
      redrawOnWindowResize:true
    };

    this.xaxis = {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      offsetY: 10,
      labels: {
        style: {
          colors: ['#7d02d4', 'rgb(217, 3, 114)','rgb(4, 167, 119)', ],
          fontSize: '17px',
        }
      }
    };

    this.stroke  = {
      curve: 'smooth',
    }

    this.legend = {
      show:false
    }

    this.fill = {
      type: 'solid',
      opacity: 1,
      colors: ['#7d02d4','rgb(217, 3, 114)',  'rgb(4, 167, 119)', ],
    }

    this.tooltip = {
      fillSeriesColor : false,
      theme:'dark',
      style: {
        fontSize: '17px',
        fontFamily: 'Lato, sans-serif',
      },
    }

    this.yaxis = {
      labels: {
        style: {
          colors: ['white'],
        },
      },
    };

    this.plotOptions = {
      bar : {
        borderRadius: 10,
        columnWidth: '50%',
        distributed:true,
        borderRadiusWhenStacked: 'last',
      }
    }

    this.title = {
      text: 'Power consumption',
      style: {
        color: '#FFFFFF',
        fontSize: '19px'
      }
    };
  }
}