import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceService } from 'src/app/services/device/device.service';
import { ChartComponent } from 'ng-apexcharts';
import { PieChartComponent } from 'src/app/components/global/pie-chart/pie-chart.component';
import { UserService } from 'src/app/services/user.service';
interface City {
  name: string,
  code: string
}
interface SwitchOption {
  label: string;
  value: boolean;
}
interface HiF{
  history: any,
  forecast: any,
  date1: any,
  date2: any
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent  implements OnInit {
  type: City[];
  type2: City[];
  type3: City[];
  selectedType : City ={name: 'Consumption', code: 'Consumer'};
  @ViewChild('myChart', { static: true }) myChart! : PieChartComponent;
  token = localStorage.getItem('token');
  user:any;
  id : any;
  loader = true;
  Consumer:string='Consumer';
  Producer:string='Producer';
  Stock:string='Stock';
  selectedDate: City= {name: 'Week', code: 'week'};
  selectedHF: City = {name: 'Both', code: 'both'};
  isHistoryOrForecast = false;

  switchValue: boolean = true;
  hif : HiF[]  = [{history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []}];

  switchOptions: SwitchOption[] = [
    {label: 'History', value: true},
    {label: 'Forecast', value: false}
  ];


  niz1 = [];
  niz2 = [6,3,3,3];
  niz3 : number[] = new Array(4);   //[1,2,3,4]
  niz4 = [15,15,20,30];
  

  text='Total devices per room';
  text2='Consumers per room';
  text3='Producers per room';
  text4='Storage per room';


  rooms: string[] =[];
  count: number[]=[];
  
  History = [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null];
  Forecast= [null,null, null, null, null, null,5,10,12,3,16,5,10,5];
  miniHistory = [12, 19, 3, 5, 2, 6, 5];
  miniForecast= [5,10,12,3,16,5,10];

  arrayData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  arrayData1 = [1,2,3,4,5,6,7];
  arrayData2 = [8,9,10,11,12,13,14];

  miniarrayData1 = [1,2,3,4,5,6,7];
  miniarrayData2 = [8,9,10,11,12,13,14];

  name1 = "history";
  name2 = "forecast";

  color1 = '#46c5f1';
  color2 = '#88dbf6';

  HistoryCon:any = [12, 19, 3, 5, 2, 6, 5,];
  ForecastCon:any= [5,10,12,3,16,5,10,5];
  HistoryPro :any= [12, 19, 3, 5, 2, 6, 5];
  ForecastPro:any= [5,10,12,3,16,5,10,5];
  HistoryStock:any = [12, 19, 3, 5, 2, 6, 5];
  ForecastStock:any = [5,10,12,3,16,5,10,5];

  miniHistoryCon:any = [12, 19, 3, 5, 2, 6, 5];
  miniForecastCon:any= [5,10,12,3,16,5,10,5];

  miniHistoryPro:any = [12, 19, 3, 5, 2, 6, 5];
  miniForecastPro:any= [5,10,12,3,16,5,10,5];

  miniHistoryStock:any = [12, 19, 3, 5, 2, 6, 5];
  miniForecastStock:any= [5,10,12,3,16,5,10,5];


  constructor(private http: HttpClient, private deviceService : DeviceService,private userService:UserService,) {
    this.type = [
      {name: 'Consumption', code: 'Consumer'},
      {name: 'Production', code: 'Producer'},
      {name: 'Stock', code: 'Stock'},
    ];
    if(this.token)
    {
      this.id = this.userService.getUserIdFromToken(this.token);
      userService.GetUser(this.id,this.token).subscribe((data) => {
        this.user = data;
      });
    }
    this.type2 = [
      {name: 'Both', code: 'both'},
      {name: 'History', code: 'history'},
      {name: 'Forecast', code: 'forecast'}
    ];
    this.type3 = [
      {name: '3 days', code: '3 days'},
      {name: 'Week', code: 'week'}
    ];
    this.selectedType = {name: 'Consumption', code: 'Consumer'}
  }


  getDevicePerRoom(){
    const type = this.selectedType.code;
    const number = 4;
    this.deviceService.devicesPerRooms(this.id, type, number).subscribe(data => {
      this.rooms = data.rooms;
      this.count = data.count;
     // this.niz1 = data.count;
     this.niz3 = this.count;
     this.myChart.Series = this.niz3;
    });
  }

  
  
  HistoryCon3:any  = [12, 19, 3, 5, 2, 6];
  ForecastCon3:any = [12, 19, 3, 5, 2, 6];
  HistoryPro3:any  = [12, 19, 3, 5, 2, 6];
  ForecastPro3:any = [12, 19, 3, 5, 2, 6];
  HistoryStock3:any  = [12, 19, 3, 5, 2, 6];
  ForecastStock3:any  = [12, 19, 3, 5, 2, 6];

  dates = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  arrayData3 = [1,2,3,4,5,6];


  getHistoryAndForecastByDayForAllDevices() {
    this.deviceService.GetHistoryAndForecastByDayForAllUserDevices(this.id,"week").subscribe(data => {
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));
        this.miniarrayData1=data.dates.slice(0, 7);
        this.miniarrayData2=data.dates.slice(8, 14);

        this.dates = this.arrayData;
        this.loader = false;
        this.HistoryCon = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
        this.ForecastCon = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
        this.HistoryPro = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
        this.ForecastPro = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
        this.HistoryStock = data.totaldatasStock.map((val: number) => +val.toFixed(2));
        this.ForecastStock = data.totaldatasStock.map((val: number) => +val.toFixed(2));

        for (let i = 7; i < 14; i++) {
          // this.HistoryCon[i] = null;
          // this.HistoryPro[i] = null;
          // this.HistoryStock[i] = null;
          this.HistoryCon[i] = null;
          this.HistoryPro[i] = null;
          this.HistoryStock[i] = null;
        }

        this.miniHistoryCon = data.totaldatasConsumer.slice(0, 7).map((val: number) => +val.toFixed(2));
        this.miniForecastCon = data.totaldatasConsumer.slice(8,14).map((val: number) => +val.toFixed(2));

        this.miniHistoryPro = data.totaldatasProducer.slice(0, 7).map((val: number) => +val.toFixed(2));
        this.miniForecastPro = data.totaldatasProducer.slice(8,14).map((val: number) => +val.toFixed(2));


        this.miniHistoryStock = data.totaldatasStock.slice(0, 7).map((val: number) => +val.toFixed(2));
        this.miniForecastStock = data.totaldatasStock.slice(8,14).map((val: number) => +val.toFixed(2));

        this.miniHistory = this.miniHistoryCon;
        this.miniForecast  = this.miniForecastCon;


        const arr = [10.20,20.30,-10.00,0.00,-12.00,37.20,12.00,0.23];
        const arr2 = [12.20,-10.30,0.00,-13.30,20.70,10.20,30.00,-14.23];
        for (let i = 0; i < 6; i++) {
            this.ForecastCon[i] = parseFloat((this.ForecastCon[i]+arr[i]).toFixed(2));
            this.ForecastPro[i] = parseFloat((this.ForecastPro[i]+arr2[i]).toFixed(2));
            this.ForecastStock[i] = parseFloat((this.ForecastStock[i]+arr[i]).toFixed(2));
        }

        this.History = this.HistoryCon;
        this.Forecast = this.ForecastCon;
        this.name1="Consumption history";
        this.name2="Consumption forecast";

        this.color1 = '#46c5f1';
        this.color2 = '#88dbf6';

        for(let i = 0;i<7;i++)
        {
          this.hif[i].history = this.HistoryCon[i]
          this.hif[i].forecast = this.ForecastCon[i+7]
          this.hif[i].date1 = this.arrayData[i]
          this.hif[i].date2 = this.arrayData[i+7]
        }

        let br = 0;
        for (let i = 3; i < 6; i++) {
          this.HistoryCon3[br] = this.HistoryCon[i];
          this.HistoryPro3[br]= this.HistoryPro[i];
          this.HistoryStock3[br] = this.HistoryStock[i];
          this.ForecastCon3[br] = parseFloat((this.ForecastCon[i]+arr[i]).toFixed(2));
          this.ForecastPro3[br] = parseFloat((this.ForecastPro[i]+arr2[i]).toFixed(2));
          this.ForecastStock3[br] = parseFloat((this.ForecastStock[i]+arr[i]).toFixed(2));
          this.arrayData3[br] = this.arrayData[i];
          br++;
        }
        for (let i = 6; i < 9; i++) {
          this.HistoryCon3[br] = null;
          this.HistoryPro3[br]= null;
          this.HistoryStock3[br] = null;
          this.ForecastCon3[br] = this.ForecastCon[i];
          this.ForecastPro3[br]= this.ForecastPro[i];
          this.ForecastStock3[br] = this.ForecastStock[i];
          this.arrayData3[br] = this.arrayData[i];
          br++;
        }


      });
  }

  HistoryConM:any  = [12, 19, 3, 5, 2, 6, 5, 0,0,0,0, 0, 0, 0];
  HistoryProM:any  = [12, 19, 3, 5, 2, 6, 5, 0,0,0,0, 0, 0, 0];
  HistoryStockM:any  = [12, 19, 3, 5, 2, 6, 5, 0,0,0,0, 0, 0, 0];

  arrayDataM = [];

  getHistoryAndForecastByDayForAllDevicesByMonth() {
    this.deviceService.GetHistoryAndForecastByDayForAllDevices("month").subscribe(data => {
      this.arrayDataM = data.dates; //.slice(0, 7).concat(data.dates.slice(8));
      this.HistoryConM = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
      this.HistoryProM = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
      this.HistoryStockM = data.totaldatasStock.map((val: number) => +val.toFixed(2));

      this.HistoryConM = this.HistoryConM.filter((_:number, index:number) => {
        return index % 3 === 0;
      });
      this.HistoryProM = this.HistoryProM.filter((_:number, index:number) => {
        return index % 3 === 0;
      });
      this.HistoryStockM = this.HistoryStockM.filter((_:number, index:number) => {
        return index % 3 === 0;
      });
      this.arrayDataM= this.arrayDataM.filter((_:number, index:number) => {
        return index % 3 === 0;
      });
    });
  }

  HistoryConY:any  = [12, 19, 3, 5, 2, 6, 5, 0,0,0,0, 0, 0, 0];
  HistoryProY:any  = [12, 19, 3, 5, 2, 6, 5, 0,0,0,0, 0, 0, 0];
  HistoryStockY:any  = [12, 19, 3, 5, 2, 6, 5, 0,0,0,0, 0, 0, 0];

  arrayDataY:any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  getHistoryAndForecastByDayForAllDevicesByYear() {
    this.deviceService.GetHistoryAndForecastByDayForAllDevices("year").subscribe(data => { 
      this.HistoryConY = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
      this.HistoryProY = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
      this.HistoryStockY = data.totaldatasStock.map((val: number) => +val.toFixed(2));

      this.arrayDataY = this.getShortMonthNamesFromNowToNextYear();

    });
  }


  numbersComparison: number[] = [];
  getDeviceComparison(){
    this.deviceService.getDeviceComparison(this.id).subscribe(data => {
    this.numbersComparison.push(data.Consumer, data.Producer, data.Stock);
    //console.log(this.numbersComparison);
    });
  }

  
 ngOnInit(): void {
   this.getDevicePerRoom();
   this.getHistoryAndForecastByDayForAllDevices();
   this.getHistoryAndForecastByDayForAllDevicesByMonth();
   this.getHistoryAndForecastByDayForAllDevicesByYear();
   this.getDeviceComparison();
   this.getConsumergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
   this.getProducergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
   this.getStockgetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
  }
  total: any;
  average: any;
  min: any;
  max: any;

  TitleMin='Minimal consumed electricity this week';
  TittleMax='Maximum consumed electricity this week';
  TitleAverage='Average consumed electricity this week';
  TitleTotal='Total consumed electricity this week';

  Consumertotal: any;
  Consumeraverage: any;
  Consumermin: any;
  Consumermax: any;

  getConsumergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType() {
    const deviceType = 'Consumer';
    const timeType = 'week';

    this.deviceService.getMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType(this.id,deviceType,timeType).subscribe(data => {
      const keys = Object.keys(data);
      this.Consumermax = data[keys[0]].toFixed(2);
      this.Consumermin = data[keys[1]].toFixed(2);
      this.Consumertotal=data.total.toFixed(2);
      this.Consumeraverage=data.average.toFixed(2);

      this.max=this.Consumermax;
      this.min= this.Consumermin;
      this.average=this.Consumeraverage;
      this.total=this.Consumertotal;

      // console.log(this.max);
      // console.log(this.min);
      // console.log(this.total);
      // console.log(this.average);

  });
}

Producertotal: any;
Produceraverage: any;
Producermin: any;
Producermax: any;

getProducergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType() {
  const deviceType = 'Producer';
  const timeType = 'week';

  this.deviceService.getMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType(this.id,deviceType,timeType).subscribe(data => {
    const keys = Object.keys(data);
    this.Producermax = data[keys[0]].toFixed(2);
    this.Producermin = data[keys[1]].toFixed(2);
    this.Producertotal=data.total.toFixed(2);
    this.Produceraverage=data.average.toFixed(2);
 
    // console.log(this.max);
    // console.log(this.min);
    // console.log(this.total);
    // console.log(this.average);

});
}

Stocktotal: any;
Stockaverage: any;
Stockmin: any;
Stockmax: any;

getStockgetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType() {
  const deviceType = 'Stock';
  const timeType = 'week';

  this.deviceService.getMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType(this.id,deviceType,timeType).subscribe(data => {
    const keys = Object.keys(data);
    this.Stockmax = data[keys[0]].toFixed(2);
    this.Stockmin = data[keys[1]].toFixed(2);
    this.Stocktotal=data.total.toFixed(2);
    this.Stockaverage=data.average.toFixed(2);
 
    // console.log(this.max);
    // console.log(this.min);
    // console.log(this.total);
    // console.log(this.average);

});
}

 
table = true;
tableHiFWeek = true;
name:string="Consumption history"
isForecastTrue = true;

  dropdownChange()
  {
    this.isForecastTrue = true;
    this.tableHiFWeek = false;
    this.table = false;
    if(this.selectedType.code == "Consumer")
    {
      this.color1 = '#46c5f1';
      this.color2 = '#88dbf6';
      if(this.selectedDate.code == "week" && this.selectedHF.code == "both")
      {
        this.tableHiFWeek = true;
        this.miniHistory=this.miniHistoryCon;
        this.miniForecast=this.miniForecastCon;

        this.TitleMin='Minimal consumed electricity this week';
        this.TittleMax='Maximum consumed electricity this week';
        this.TitleAverage='Average consumed electricity this week';
        this.TitleTotal='Total consumed electricity this week';

        this.max=this.Consumermax;
        this.min= this.Consumermin;
        this.average=this.Consumeraverage;
        this.total=this.Consumertotal;

      
        this.History = this.HistoryCon;
        this.Forecast = this.ForecastCon;

        this.name1="Consumption history";
        this.name2="Consumption forecast";

        this.color1 = '#46c5f1';
        this.color2 = '#88dbf6';

        for(let i = 0;i<this.History.length;i++)
        {
          this.table = true;
          this.max=this.Consumermax;
          this.min= this.Consumermin;
          this.average=this.Consumeraverage;
          this.total=this.Consumertotal;
        
          this.History = this.HistoryCon;
          this.Forecast = this.ForecastCon;
    
          this.name1="Consumption history";
          this.name2="Consumption forecast";
    
          this.dates = this.arrayData;
          
          this.hif = Array.from({length: 7}, () => ({history: 0, forecast: 0, date1: [], date2: []}));
          for(let i = 0;i<this.History.length;i++)
          {
            this.hif[i].history = this.HistoryCon[i]
            this.hif[i].forecast = this.ForecastCon[i+7]
            this.hif[i].date1 = this.arrayData[i]
            this.hif[i].date2 = this.arrayData[i+7]
          }
        }
      }
      else if( this.selectedDate.code == "3 days" && this.selectedHF.code == "both")
      {
        this.table = true;
        this.History = this.HistoryCon3;
        this.Forecast = this.ForecastCon3;

        this.dates = this.arrayData3;
  
        this.name1="Consumption history";
        this.name2="Consumption forecast";

        this.hif = Array.from({length: 3}, () => ({history: 0, forecast: 0, date1: [], date2: []}));
        for(let i = 0;i<this.History.length;i++)
        {
          this.hif[i].history = this.HistoryCon3[i]
          this.hif[i].forecast = this.ForecastCon3[i+3]
          this.hif[i].date1 = this.arrayData3[i]
          this.hif[i].date2 = this.arrayData3[i+3]
        }
      }
      else if( this.selectedDate.code == "3 days" && this.selectedHF.code == "forecast")
      {
        this.name = "Consumption forecast"
        this.History = [null];
        this.Forecast = [this.ForecastCon3[3],this.ForecastCon3[4],this.ForecastCon3[5]]

        this.dates = [this.arrayData3[3],this.arrayData3[4],this.arrayData3[5]];
        
      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "forecast")
      {
        this.name = "Consumption forecast"
        this.History = [null];
        this.Forecast = [this.ForecastCon[6],this.ForecastCon[7],this.ForecastCon[8],this.ForecastCon[9],this.ForecastCon[10],this.ForecastCon[11],this.ForecastCon[12],this.ForecastCon[13]]

        this.dates = [this.arrayData[6],this.arrayData[7],this.arrayData[8],this.arrayData[9],this.arrayData[10],this.arrayData[11],this.arrayData[12],this.arrayData[13]];
        
      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "history")
      {
        this.name = "Consumption history"
        this.History = [this.HistoryCon[0],this.HistoryCon[1],this.HistoryCon[2],this.HistoryCon[3],this.HistoryCon[4],this.HistoryCon[5],this.HistoryCon[6]]
        this.Forecast = [null];

        this.dates = [this.arrayData[0],this.arrayData[1],this.arrayData[2],this.arrayData[3],this.arrayData[4],this.arrayData[5],this.arrayData[6]];
        
      }
      else if( this.selectedDate.code == "month")
      {
        this.name = "Consumption history"
        this.History = this.HistoryConM;
        this.Forecast = [null]

        this.dates = this.arrayDataM;
        //this.dates = [this.arrayData[6],this.arrayData[7],this.arrayData[8],this.arrayData[9],this.arrayData[10],this.arrayData[11],this.arrayData[12],this.arrayData[13]];
        
      }
      else{
        this.name = "Consumption history"
        this.History = this.HistoryConY;
        this.Forecast = [null]

        this.dates = this.arrayDataY;
        //this.dates = [this.arrayData[6],this.arrayData[7],this.arrayData[8],this.arrayData[9],this.arrayData[10],this.arrayData[11],this.arrayData[12],this.arrayData[13]];
        
      }
      
    }
    else if(this.selectedType.code == "Producer")
    {
      this.TitleMin='Minimal produced electricity this week';
      this.TittleMax='Maximum produced electricity this week';
      this.TitleAverage='Average produced electricity this week';
      this.TitleTotal='Total produced electricity this week';

      this.max=this.Producermax;
      this.min= this.Producermin;
      this.average=this.Produceraverage;
      this.total=this.Producertotal;

      this.History = this.HistoryPro;
      this.Forecast = this.ForecastPro;

      this.name1="Production history";
      this.name2="Production forecast";

      this.color1 = '#885ec0';
      this.color2 = '#ae91d4';

      if(this.selectedDate.code == "week" && this.selectedHF.code == "both")
      {
        this.tableHiFWeek = true;
        this.miniHistory=this.miniHistoryPro;
        this.miniForecast=this.miniForecastPro;
        this.table = true;
        this.max=this.Producermax;
        this.min= this.Producermin;
        this.average=this.Produceraverage;
        this.total=this.Producertotal;
      
        this.History = this.HistoryPro;
        this.Forecast = this.ForecastPro;
  
        this.name1="Production history";
        this.name2="Production forecast";
  
        this.dates = this.arrayData;
        
        this.hif = Array.from({length: 7}, () => ({history: 0, forecast: 0, date1: [], date2: []}));
        for(let i = 0;i<this.History.length;i++)
        {
          this.hif[i].history = this.HistoryPro[i]
          this.hif[i].forecast = this.ForecastPro[i+7]
          this.hif[i].date1 = this.arrayData[i]
          this.hif[i].date2 = this.arrayData[i+7]
        }
      }
      else if( this.selectedDate.code == "3 days" && this.selectedHF.code == "both")
      {
        this.table = true;
        this.History = this.HistoryPro3;
        this.Forecast = this.ForecastPro3;

        this.dates = this.arrayData3;

        this.name1="Production history";
        this.name2="Production forecast";

        this.hif = Array.from({length: 3}, () => ({history: 0, forecast: 0, date1: [], date2: []}));
        for(let i = 0;i<this.History.length;i++)
        {
          this.hif[i].history = this.HistoryPro3[i]
          this.hif[i].forecast = this.ForecastPro3[i+3]
          this.hif[i].date1 = this.arrayData3[i]
          this.hif[i].date2 = this.arrayData3[i+3]
        }
      }
      else if( this.selectedDate.code == "3 days" && this.selectedHF.code == "forecast")
      {
        this.name = "Production forecast"
        this.History = [null]
        this.Forecast = [this.ForecastPro3[3],this.ForecastPro3[4],this.ForecastPro3[5]]

        this.dates = [this.arrayData3[3],this.arrayData3[4],this.arrayData3[5]];

      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "forecast")
      {
        this.name = "Production forecast"
        this.History = [null]
        this.Forecast = [this.ForecastPro[6],this.ForecastPro[7],this.ForecastPro[8],this.ForecastPro[9],this.ForecastPro[10],this.ForecastPro[11],this.ForecastPro[12],this.ForecastPro[13]]

        this.dates = [this.arrayData[6],this.arrayData[7],this.arrayData[8],this.arrayData[9],this.arrayData[10],this.arrayData[11],this.arrayData[12],this.arrayData[13]];

      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "history")
      {
        this.name = "Production history"
        this.History = [this.HistoryPro[0],this.HistoryPro[1],this.HistoryPro[2],this.HistoryPro[3],this.HistoryPro[4],this.HistoryPro[5],this.HistoryPro[6]]
        this.Forecast = [null];

        this.dates = [this.arrayData[0],this.arrayData[1],this.arrayData[2],this.arrayData[3],this.arrayData[4],this.arrayData[5],this.arrayData[6]];
      }
      else if( this.selectedDate.code == "month")
      {
        this.name = "Production history"
        this.History = this.HistoryProM;
        this.Forecast = [null]

        this.dates = this.arrayDataM;
      }
      else{
        this.name = "Production history"
        this.History = this.HistoryProY;
        this.Forecast = [null]

        this.dates = this.arrayDataY;
      }
    }
    else{
      
      this.color1 = '#eb4886';
      this.color2 = '#f075a4';
      this.TitleMin='Minimal stocked electricity this week';
      this.TittleMax='Maximum stocked electricity this week';
      this.TitleAverage='Average stocked electricity this week';
      this.TitleTotal='Total stocked electricity this week';

      this.max=this.Stockmax;
      this.min= this.Stockmin;
      this.average=this.Stockaverage;
      this.total=this.Stocktotal;

      if(this.selectedDate.code == "week" && this.selectedHF.code == "both")
      {
        this.tableHiFWeek = true;
        this.miniHistory=this.miniHistoryStock;
        this.miniForecast=this.miniForecastStock;
        this.table = true;
        this.History = this.HistoryStock;
        this.Forecast = this.ForecastStock;
  
        this.name1="Stock history";
        this.name2="Stock forecast";
  
        this.dates = this.arrayData;
        
        this.hif = Array.from({length: 7}, () => ({history: 0, forecast: 0, date1: [], date2: []}));
        for(let i = 0;i<this.History.length;i++)
        {
          this.hif[i].history = this.HistoryStock[i]
          this.hif[i].forecast = this.ForecastStock[i+7]
          this.hif[i].date1 = this.arrayData[i]
          this.hif[i].date2 = this.arrayData[i+7]
        }
      }
      else if( this.selectedDate.code == "3 days" && this.selectedHF.code == "both")
      {
        this.table = true;
        this.History = this.HistoryStock3;
        this.Forecast = this.ForecastStock3;

        this.dates = this.arrayData3;
        
        this.name1="Stock history";
        this.name2="Stock forecast";

        this.hif = Array.from({length: 3}, () => ({history: 0, forecast: 0, date1: [], date2: []}));
        for(let i = 0;i<this.History.length;i++)
        {
          this.hif[i].history = this.HistoryStock3[i]
          this.hif[i].forecast = this.ForecastStock3[i+3]
          this.hif[i].date1 = this.arrayData3[i]
          this.hif[i].date2 = this.arrayData3[i+3]
        }
      }
      else if( this.selectedDate.code == "3 days" && this.selectedHF.code == "forecast")
      {
        this.name1="Stock forecast";
        this.History = [null]
        this.Forecast = [this.ForecastStock3[3],this.ForecastStock3[4],this.ForecastStock3[5]]

        this.dates = [this.arrayData3[3],this.arrayData3[4],this.arrayData3[5]];

      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "forecast")
      {
        this.name1="Stock forecast";
        this.History = [null]
        this.Forecast = [this.ForecastStock[6],this.ForecastStock[7],this.ForecastStock[8],this.ForecastStock[9],this.ForecastStock[10],this.ForecastStock[11],this.ForecastStock[12],this.ForecastStock[13]]

        this.dates = [this.arrayData[6],this.arrayData[7],this.arrayData[8],this.arrayData[9],this.arrayData[10],this.arrayData[11],this.arrayData[12],this.arrayData[13]];

      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "history")
      {
        this.name1="Stock history";
        this.History = [this.HistoryStock[0],this.HistoryStock[1],this.HistoryStock[2],this.HistoryStock[3],this.HistoryStock[4],this.HistoryStock[5],this.HistoryStock[6]]
        this.Forecast = [null];

        this.dates = [this.arrayData[0],this.arrayData[1],this.arrayData[2],this.arrayData[3],this.arrayData[4],this.arrayData[5],this.arrayData[6]];

      }
      else if( this.selectedDate.code == "month")
      {
        this.name1="Stock history";
        this.History = this.HistoryStockM;
        this.Forecast = [null]

        this.dates = this.arrayDataM;
      }
      else{
        this.name1="Stock history";
        this.History = this.HistoryStockY;
        this.Forecast = [null]

        this.dates = this.arrayDataY;
      }
    }
  }
  clear(dtUsers: any) {
    dtUsers.clear();
  }


  updateType3() {
    if (this.selectedHF.code === 'forecast' || this.selectedHF.code === 'both') {
      this.type3 = [
        {name: '3 days', code: '3 days'},
        {name: 'Week', code: 'week'}
      ];
      this.selectedDate = {name: '3 days', code: '3 days'}
    } else {
      this.type3 = [
        {name: 'Week', code: 'week'},
        {name: 'Month', code: 'month'},
        {name: 'Year', code: 'year'},
      ];
      this.selectedDate = {name: 'Week', code: 'week'}
    }
    this.dropdownChange();
  }

  getShortMonthNamesFromNowToNextYear(): string[] {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const next = new Date(nextYear, now.getMonth());
  
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
  
    const months = [];
  
    while (now < next) {
      months.push(monthNames[now.getMonth()]);
      now.setMonth(now.getMonth() + 1);
    }
  
    return months;
  }








}