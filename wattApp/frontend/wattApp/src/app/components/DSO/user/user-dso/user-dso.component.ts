import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device/device.service';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';


interface HiF{
  history: any,
  forecast: any,
  date1: any,
  date2: any
}

interface SwitchOption {
  label: string;
  value: boolean;
}

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-user-dso',
  templateUrl: './user-dso.component.html',
  styleUrls: ['./user-dso.component.scss']
})
export class UserDSOComponent implements OnInit{
  lightMode: Boolean = true;
  id : any;
  type: City[];
  type2: City[];
  type3: City[];
  loader = true;
  Consumer:string='Consumer';
  Producer:string='Producer';
  Stock:string='Stock';
  user:any;
  selectedType: City= {name: 'Consumption', code: 'Consumer'};
  selectedDate: City= {name: 'Week', code: 'week'};
  selectedHF: City = {name: 'Both', code: 'both'};

  responsiveOptions: any = null;
  Title = "Consumption history & forecast"
  Period = "week"

  hif : HiF[]  = [{history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []}];  
  
  name1 = "history";
  name2 = "forecast";

  color1 = '#46c5f1';
  color2 = '#88dbf6';


  switchOptions: SwitchOption[] = [
    {label: 'Statistics', value: true},
    {label: 'Devices', value: false}
  ];
  switchValue: boolean = true;
  isForecastTrue: boolean=false;



  constructor(private route: ActivatedRoute,
    private router1: Router,private dsonew : DsonewsService,private userService:UserService,private deviceService:DeviceService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.type = [
      {name: 'Consumption', code: 'Consumer'},
      {name: 'Production', code: 'Producer'},
      {name: 'Stock', code: 'Stock'},
    ];
    this.type2 = [
      {name: 'History & forecast', code: 'both'},
      {name: 'History', code: 'history'},
      {name: 'Forecast', code: 'forecast'}
    ];
    this.type3 = [
      {name: '3 days', code: '3 days'},
      {name: 'Week', code: 'week'}
    ];
    this.selectedType = {name: 'Consumption', code: 'Consumer'}
  }

  news: any[] = [];
  
  naslov1 : any;
  naslov2 : any;
  naslov3 : any;

  sadrzaj1 : any;
  sadrzaj2 : any;
  sadrzaj3 : any;

  datum1 : any;
  datum2 : any;
  datum3 : any;

  status1 : any;
  status2 : any;
  status3 : any;

  getNews() {
  
    this.dsonew.getnew().subscribe((data: any) => {
      this.news = data;
      this.news.sort((a, b) => b.id - a.id);
      //console.log(data);


     this.naslov1 = this.news[0].title;
     this.naslov2 = this.news[1].title;
     this.naslov3 = this.news[2].title;

     this.sadrzaj1 = this.news[0].content;
     this.sadrzaj2 = this.news[1].content;
     this.sadrzaj3 = this.news[2].content;

     this.datum1 = new Date(this.news[0].created).toLocaleDateString();
     this.datum2 = new Date(this.news[1].created).toLocaleDateString();
     this.datum3 = new Date(this.news[2].created).toLocaleDateString();

     this.status1 = this.news[0].priority;
     this.status2 = this.news[1].priority;
     this.status3 = this.news[2].priority;

     console.log(this.news);
    });
  
  }



  async ngOnInit(): Promise<void> {
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
    });
    this.getNews();
    this.getConsumergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
   this.getHistoryAndForecastByDayForAllDevices();
   this.getHistoryAndForecastByDayForAllDevicesByMonth();
   this.getHistoryAndForecastByDayForAllDevicesByYear();
  }

  getUser()
  {
      this.userService.GetUserWithoutToken(this.id).subscribe(data =>{
        this.user = data;
      })
    
  }

  

  
  History:any = [0, 0, 0, 0, 0, 0, 0, 0,0,0,0, 0, 0, 0];
  Forecast:any= [0,0, 0, 0, 0, 0,0,0,0,0,0,0,0,0];
  
  HistoryCon:any  = [0, 0, 0, 0, 0, 0, 0, 0,0,0,0, 0, 0, 0];
  ForecastCon:any = [0,0, 0, 0, 0, 0,0,0,0,0,0,0,0,0];
  HistoryPro:any  = [0, 0, 0, 0, 0,0, 0, 0,0,0,0, 0, 0, 0];
  ForecastPro:any = [0,0, 0, 0, 0, 0,0,0,0,0,0,0,0,0];
  HistoryStock:any  = [0, 0, 0, 0, 0, 0, 0, 0,0,0,0, 0, 0, 0];
  ForecastStock:any  =  [0, 0, 0, 0, 0, 0, 0, 0,0,0,0, 0, 0, 0];

  HistoryCon3:any  = [0, 0, 0, 0, 0, 0];
  ForecastCon3:any = [0, 0, 0, 0, 0, 0];
  HistoryPro3:any  =  [0, 0, 0, 0, 0, 0];
  ForecastPro3:any =  [0, 0, 0, 0, 0, 0];
  HistoryStock3:any  =  [0, 0, 0, 0, 0, 0];
  ForecastStock3:any  =  [0, 0, 0, 0, 0, 0];

  dates = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  arrayData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  arrayData3 = [0,0,0,0,0,0];


  getHistoryAndForecastByDayForAllDevices() {
    this.deviceService.GetHistoryAndForecastByDayForAllUserDevices(this.id,"week").subscribe(data => {
        this.loader = false;
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));
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

        const arr = [10.20,20.30,-6.00,0.00,-7.07,37.20,12.00,0.23];
        const arr2 = [12.20,-3.30,0.00,-3.30,20.70,10.20,30.00,-8.23];
        if(this.ForecastCon.every((el: number) => el === 0))
        {this.ForecastCon[5] = null}
        else{
            for (let i = 0; i < 6; i++) {
              this.ForecastCon[i] = parseFloat((this.ForecastCon[i]+arr[i]).toFixed(2));
          }
        }
        if(this.ForecastPro.every((el: number) => el === 0))
        {this.ForecastPro[5] = null}
        else{
            for (let i = 0; i < 6; i++) {
              this.ForecastPro[i] = parseFloat((this.ForecastPro[i]+arr2[i]).toFixed(2));
          }
        }
        if(this.ForecastStock.every((el: number) => el === 0))
        {this.ForecastStock[5] = null}
        else{
            for (let i = 0; i < 6; i++) {
              this.ForecastStock[i] = parseFloat((this.ForecastStock[i]+arr[i]).toFixed(2));
          }
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
          this.ForecastCon3[br] = parseFloat((this.ForecastCon[i]).toFixed(2));
          this.ForecastPro3[br] = parseFloat((this.ForecastPro[i]).toFixed(2));
          this.ForecastStock3[br] = parseFloat((this.ForecastStock[i]).toFixed(2));
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


      },
      (error: any) => {
        this.loader = false;
      });
  }



  HistoryConM:any  = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  HistoryProM:any  = [ 0, 0, 0, 0, 0, 0, 0, 0,0,0,0, 0, 0, 0];
  HistoryStockM:any  = [ 0, 0, 0, 0, 0, 0, 0, 0,0,0,0, 0, 0, 0];

  arrayDataM = [];

  getHistoryAndForecastByDayForAllDevicesByMonth() {
    this.deviceService.GetHistoryAndForecastByDayForAllDevices("monthhistory").subscribe(data => {
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

  HistoryConY:any  = [ 0, 0, 0, 0, 0, 0, 0, 0,0,0,0, 0, 0, 0];
  HistoryProY:any  = [ 0, 0, 0, 0, 0, 0, 0, 0,0,0,0, 0, 0, 0];
  HistoryStockY:any  = [ 0, 0, 0, 0, 0, 0, 0, 0,0,0,0, 0, 0, 0];

  arrayDataY:any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  getHistoryAndForecastByDayForAllDevicesByYear() {
    this.deviceService.GetHistoryAndForecastByDayForAllDevices("year").subscribe(data => { 
      this.HistoryConY = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
      this.HistoryProY = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
      this.HistoryStockY = data.totaldatasStock.map((val: number) => +val.toFixed(2));

      this.arrayDataY = this.getShortMonthNamesFromNowToNextYear();

    });
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
    months.push(months[0])
  
    return months;
  }









  total: any;
  average: any;
  min: any;
  max: any;

  TitleMin='Minimal consumed by day this week';
  TittleMax='Maximal consumed by day this week';
  TitleAverage='Average consumed by day this week';
  TitleTotal='Total consumed by day this week';

  Consumertotal: any;
  Consumeraverage: any;
  Consumermin: any;
  Consumermax: any;

  dataMin: any;
dataMax: any;

  getConsumergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType() {
    const deviceType = this.selectedType.code;

   
    this.deviceService.getMaxMinAvgTotalPowerUsageByTimeForUserDevicesByType(this.id,deviceType,this.selectedDate.code).subscribe(data => {
      if(!data)
      {
        this.max=0;
        this.min= 0;
        this.average=0;
        this.total=0;
        return; 
      }
      const keys = Object.keys(data);



      this.dataMin = keys[1];
      this.dataMax = keys[0];
      
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



table = true;
name:string="Consumption history"
theDay = "On the day: ";

  dropdownChange()
  {
    this.getConsumergetMaxMinAvgTotalPowerUsageByTimeForAllDevicesByType();
    this.isForecastTrue = true;
    this.table = false;
    if(this.selectedType.code == "Consumer")
    {
      this.color1 = '#46c5f1';
      this.color2 = '#88dbf6';
      if(this.selectedDate.code == "week" && this.selectedHF.code == "both")
      {
        this.Period = "week"
        this.Title = "Consumption history & forecast"
        this.TitleMin='Minimal consumed by day this week';
        this.TittleMax='Maximal consumed by day this week';
        this.TitleAverage='Average consumed by day this week';
        this.TitleTotal='Total consumed by day this week';
        this.theDay = "On the day: ";

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
        this.Period = "3 days"
        this.Title = "Consumption history & forecast"
        this.TitleMin='Minimal consumed by day for 3 days';
        this.TittleMax='Maximal consumed by day for 3 days';
        this.TitleAverage='Average consumed by day for 3 days';
        this.TitleTotal='Total consumed by day for 3 days';
        this.theDay = "On the day: ";

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
        this.Period = "3 days"
        this.Title = "Consumption forecast"
        this.TitleMin='Minimal consumed by day for 3 days';
        this.TittleMax='Maximal consumed by day for 3 days';
        this.TitleAverage='Average consumed by day for 3 days';
        this.TitleTotal='Total consumed by day for 3 days';
        this.theDay = "On the day: ";

        this.name = "Consumption forecast"
        this.History = [null];
        this.Forecast = [this.ForecastCon3[3],this.ForecastCon3[4],this.ForecastCon3[5]]

        this.dates = [this.arrayData3[3],this.arrayData3[4],this.arrayData3[5]];
        
      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "forecast")
      {
        this.Period = "week"
        this.Title = "Consumption forecast"
        this.TitleMin='Minimal consumed by day this week';
        this.TittleMax='Maximal consumed by day this week';
        this.TitleAverage='Average consumed by day this week';
        this.TitleTotal='Total consumed by day this week';
        this.theDay = "On the day: ";

        this.name = "Consumption forecast"
        this.History = [null];
        this.Forecast = [this.ForecastCon[6],this.ForecastCon[7],this.ForecastCon[8],this.ForecastCon[9],this.ForecastCon[10],this.ForecastCon[11],this.ForecastCon[12],this.ForecastCon[13]]

        this.dates = [this.arrayData[6],this.arrayData[7],this.arrayData[8],this.arrayData[9],this.arrayData[10],this.arrayData[11],this.arrayData[12],this.arrayData[13]];
        
      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "history")
      {
        this.Period = "week"
        this.Title = "Consumption history"
        this.TitleMin='Minimal consumed by day this week';
        this.TittleMax='Maximal consumed by day this week';
        this.TitleAverage='Average consumed by day this week';
        this.TitleTotal='Total consumed by day this week';
        this.theDay = "On the day: ";

        this.name = "Consumption history"
        this.History = [this.HistoryCon[0],this.HistoryCon[1],this.HistoryCon[2],this.HistoryCon[3],this.HistoryCon[4],this.HistoryCon[5],this.HistoryCon[6]]
        this.Forecast = [null];

        this.dates = [this.arrayData[0],this.arrayData[1],this.arrayData[2],this.arrayData[3],this.arrayData[4],this.arrayData[5],this.arrayData[6]];
        
      }
      else if( this.selectedDate.code == "month")
      {
        this.Period = "month"
        this.Title = "Consumption history"
        this.TitleMin='Minimal consumed by day this month';
        this.TittleMax='Maximal consumed by day this month';
        this.TitleAverage='Average consumed by day this month';
        this.TitleTotal='Total consumed by day this month';
        this.theDay = "On the day: ";

        this.name = "Consumption history"
        this.History = this.HistoryConM;
        this.Forecast = [null]

        this.dates = this.arrayDataM;
        //this.dates = [this.arrayData[6],this.arrayData[7],this.arrayData[8],this.arrayData[9],this.arrayData[10],this.arrayData[11],this.arrayData[12],this.arrayData[13]];
        
      }
      else{
        this.Period = "year"
        this.Title = "Consumption history"
        this.TitleMin='Minimal consumed by day this year';
        this.TittleMax='Maximal consumed by day this year';
        this.TitleAverage='Average consumed by day this year';
        this.TitleTotal='Total consumed by day this year';
        this.theDay = "On the month: ";

        this.name = "Consumption history"
        this.History = this.HistoryConY;
        this.Forecast = [null]

        this.dates = this.arrayDataY;
        //this.dates = [this.arrayData[6],this.arrayData[7],this.arrayData[8],this.arrayData[9],this.arrayData[10],this.arrayData[11],this.arrayData[12],this.arrayData[13]];
        
      }
      
    }
    else if(this.selectedType.code == "Producer")
    {
      this.TitleMin='Minimal produced by day this week';
      this.TittleMax='Maximal produced by day this week';
      this.TitleAverage='Average produced by day this week';
      this.TitleTotal='Total produced by day this week';
      this.theDay = "On the day: ";

   

      this.History = this.HistoryPro;
      this.Forecast = this.ForecastPro;

      this.name1="Production history";
      this.name2="Production forecast";

      this.color1 = '#885ec0';
      this.color2 = '#ae91d4';

      if(this.selectedDate.code == "week" && this.selectedHF.code == "both")
      {
        this.Period = "week"
        this.Title = "Production history & forecast"
        this.TitleMin='Minimal produced by day this week';
        this.TittleMax='Maximal produced by day this week';
        this.TitleAverage='Average produced by day this week';
        this.TitleTotal='Total produced by day this week';
        this.theDay = "On the day: ";

        this.table = true;
     
      
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
        this.Period = "3 days"
        this.Title = "Production history & forecast"
        this.TitleMin='Minimal produced by day for 3 days';
        this.TittleMax='Maximal produced by day for 3 days';
        this.TitleAverage='Average produced by day for 3 days';
        this.TitleTotal='Total produced by day for 3 days';
        this.theDay = "On the day: ";

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
        this.Period = "3 days"
        this.Title = "Production forecast"
        this.TitleMin='Minimal produced by day for 3 days';
        this.TittleMax='Maximal produced by day for 3 days';
        this.TitleAverage='Average produced by day for 3 days';
        this.TitleTotal='Total produced by day for 3 days';
        this.theDay = "On the day: ";

        this.name = "Production forecast"
        this.History = [null]
        this.Forecast = [this.ForecastPro3[3],this.ForecastPro3[4],this.ForecastPro3[5]]

        this.dates = [this.arrayData3[3],this.arrayData3[4],this.arrayData3[5]];

      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "forecast")
      {
        this.Period = "week"
        this.Title = "Production forecast"
        this.TitleMin='Minimal produced by day this week';
        this.TittleMax='Maximal produced by day this week';
        this.TitleAverage='Average produced by day this week';
        this.TitleTotal='Total produced by day this week';
        this.theDay = "On the day: ";

        this.name = "Production forecast"
        this.History = [null]
        this.Forecast = [this.ForecastPro[6],this.ForecastPro[7],this.ForecastPro[8],this.ForecastPro[9],this.ForecastPro[10],this.ForecastPro[11],this.ForecastPro[12],this.ForecastPro[13]]

        this.dates = [this.arrayData[6],this.arrayData[7],this.arrayData[8],this.arrayData[9],this.arrayData[10],this.arrayData[11],this.arrayData[12],this.arrayData[13]];

      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "history")
      {
        this.Period = "week"
        this.Title = "Production history"
        this.TitleMin='Minimal produced by day this week';
        this.TittleMax='Maximal produced by day this week';
        this.TitleAverage='Average produced by day this week';
        this.TitleTotal='Total produced by day this week';
        this.theDay = "On the day: ";

        this.name = "Production history"
        this.History = [this.HistoryPro[0],this.HistoryPro[1],this.HistoryPro[2],this.HistoryPro[3],this.HistoryPro[4],this.HistoryPro[5],this.HistoryPro[6]]
        this.Forecast = [null];

        this.dates = [this.arrayData[0],this.arrayData[1],this.arrayData[2],this.arrayData[3],this.arrayData[4],this.arrayData[5],this.arrayData[6]];
      }
      else if( this.selectedDate.code == "month")
      {
        this.Period = "month"
        this.Title = "Production history"
        this.TitleMin='Minimal produced by day this month';
        this.TittleMax='Maximal produced by day this month';
        this.TitleAverage='Average produced by day this month';
        this.TitleTotal='Total produced by day this month';
        this.theDay = "On the day: ";

        this.name = "Production history"
        this.History = this.HistoryProM;
        this.Forecast = [null]

        this.dates = this.arrayDataM;
      }
      else{
        this.Period = "year"
        this.Title = "Production history"
        this.TitleMin='Minimal produced by day this year';
        this.TittleMax='Maximal produced by day this year';
        this.TitleAverage='Average produced by day this year';
        this.TitleTotal='Total produced by day this year';

        this.theDay = "On the month: ";

        this.name = "Production history"
        this.History = this.HistoryProY;
        this.Forecast = [null]

        this.dates = this.arrayDataY;
      }
    }
    else{
      
      this.color1 = '#eb4886';
      this.color2 = '#f075a4';

      this.TitleMin='Minimal stocked by day this week';
      this.TittleMax='Maximal stocked by day this week';
      this.TitleAverage='Average stocked by day this week';
      this.TitleTotal='Total stocked by day this week';
      this.theDay = "On the day: ";



      if(this.selectedDate.code == "week" && this.selectedHF.code == "both")
      {
        this.Period = "week"
        this.Title = "Storage history & forecast"
        this.TitleMin='Minimal stocked by day this week';
      this.TittleMax='Maximal stocked by day this week';
      this.TitleAverage='Average stocked by day this week';
      this.TitleTotal='Total stocked by day this week';
      this.theDay = "On the day: ";

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
        this.Period = "3 days"
        this.Title = "Storage history & forecast"
        this.TitleMin='Minimal stocked by day for 3 days';
        this.TittleMax='Maximal stocked by day for 3 days';
        this.TitleAverage='Average stocked by day for 3 days';
        this.TitleTotal='Total stocked by day for 3 days';
        this.theDay = "On the day: ";

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
        this.Period = "3 days"
        this.Title = "Storage forecast"
        this.TitleMin='Minimal stocked by day for 3 days';
        this.TittleMax='Maximal stocked by day for 3 days';
        this.TitleAverage='Average stocked by day for 3 days';
        this.TitleTotal='Total stocked by day for 3 days';
        this.theDay = "On the day: ";

        this.name1="Stock forecast";
        this.History = [null]
        this.Forecast = [this.ForecastStock3[3],this.ForecastStock3[4],this.ForecastStock3[5]]

        this.dates = [this.arrayData3[3],this.arrayData3[4],this.arrayData3[5]];

      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "forecast")
      {
        this.Period = "week"
        this.Title = "Storage forecast"
        this.TitleMin='Minimal stocked by day this week';
      this.TittleMax='Maximal stocked by day this week';
      this.TitleAverage='Average stocked by day this week';
      this.TitleTotal='Total stocked by day this week';
      this.theDay = "On the day: ";

        this.name1="Stock forecast";
        this.History = [null]
        this.Forecast = [this.ForecastStock[6],this.ForecastStock[7],this.ForecastStock[8],this.ForecastStock[9],this.ForecastStock[10],this.ForecastStock[11],this.ForecastStock[12],this.ForecastStock[13]]

        this.dates = [this.arrayData[6],this.arrayData[7],this.arrayData[8],this.arrayData[9],this.arrayData[10],this.arrayData[11],this.arrayData[12],this.arrayData[13]];

      }
      else if( this.selectedDate.code == "week" && this.selectedHF.code == "history")
      {
        this.Period = "week"
        this.Title = "Storage historyt"
        this.TitleMin='Minimal stocked by day this week';
      this.TittleMax='Maximal stocked by day this week';
      this.TitleAverage='Average stocked by day this week';
      this.TitleTotal='Total stocked by day this week';
      this.theDay = "On the day: ";

        this.name1="Stock history";
        this.History = [this.HistoryStock[0],this.HistoryStock[1],this.HistoryStock[2],this.HistoryStock[3],this.HistoryStock[4],this.HistoryStock[5],this.HistoryStock[6]]
        this.Forecast = [null];

        this.dates = [this.arrayData[0],this.arrayData[1],this.arrayData[2],this.arrayData[3],this.arrayData[4],this.arrayData[5],this.arrayData[6]];

      }
      else if( this.selectedDate.code == "month")
      {
        this.Period = "month"
        this.Title = "Storage history"
        this.TitleMin='Minimal stocked by day this month';
      this.TittleMax='Maximal stocked by day this month';
      this.TitleAverage='Average stocked by day this month';
      this.TitleTotal='Total stocked by day this month';
      this.theDay = "On the day: ";

        this.name1="Stock history";
        this.History = this.HistoryStockM;
        this.Forecast = [null]

        this.dates = this.arrayDataM;
      }
      else{
        this.Period = "year"
        this.Title = "Storage history"
        this.TitleMin='Minimal stocked by day this year';
      this.TittleMax='Maximal stocked by day this year';
      this.TitleAverage='Average stocked by day this year';
      this.TitleTotal='Total stocked by day this year';
      this.theDay = "On the month: ";
      
        this.name1="Stock history";
        this.History = this.HistoryStockY;
        this.Forecast = [null]

        this.dates = this.arrayDataY;
      }
    }
  }

}
