import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomTypesService } from 'src/app/services/room-types/room-types.service';
import { ModelTypesService } from 'src/app/services/model-types/model-types.service';
import { DeviceTypesService } from 'src/app/services/device-types/device-types.service';
import { lastValueFrom, map, tap } from 'rxjs';
import { HistoryLineChartComponent } from 'src/app/components/Prosumer/history-line-chart/history-line-chart.component';
import { HistoryForecastComponent } from '../../history-forecast/history-forecast.component';
import { ForecastLineChartComponent } from 'src/app/components/Prosumer/forecast-line-chart/forecast-line-chart.component';

interface Models{
  code: string;
  name: string;
}

interface Rooms{
  code: string;
  name: string;
}

interface Types{
  code: string;
  name: string;
}

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
  selector: 'app-device-desktop',
  templateUrl: './device-desktop.component.html',
  styleUrls: ['./device-desktop.component.scss']
})
export class DeviceDesktopComponent implements OnInit {
  device!: DeviceDTO;
  loader=true;

  displayEditDeviceDialog: boolean = false;
  isRunning: boolean = true;

  editDeviceDialogForm! : FormGroup;
  nameSelected!: string;
  types!: Types[];
  rooms!: Rooms[];
  models! : Models[];
  typeSelected! : Types;
  roomSelected! : Rooms;
  modelSelected! : Models;
  display3 : Boolean = false;

  type: City[];
  type2: City[];
  type3: City[];
  selectedType : City ={name: 'Consumption', code: 'Consumer'};
  selectedDate: City= {name: 'Week', code: 'week'};
  selectedHF: City = {name: 'Both', code: 'both'};

  array : any[]  = [null,null, null, null, null, null, null,null,null,null, null, null, null]
  array2 : any[] = [null,null, null, null, null, null,null,null, null, null, null, null,null]
  array3 : any[] = []
  array4 : any[] = [null,null,null,null,null,null,null]
  array5 : any[] = [null,null,null,null,null,null,null]
  date1 : any[] = []
  date2: any[] = []

  hif : HiF[]  = [{history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []}];

  name1="History"
  name2="Forecast"

  switchValue: boolean = true;

  switchOptions: SwitchOption[] = [
    {label: 'History', value: true},
    {label: 'Forecast', value: false}
  ];


  constructor(private route: ActivatedRoute, 
              private deviceService: DeviceService, 
              private router: Router,
              private fromBuilder: FormBuilder,
              private roomTypesService: RoomTypesService,
              private modelTypesService: ModelTypesService,
              private deviceTypesService: DeviceTypesService) 
              {

                this.type = [
                  {name: 'Consumption', code: 'Consumer'},
                  {name: 'Production', code: 'Producer'},
                  {name: 'Stock', code: 'Stock'},
                ];
                this.type2 = [
                  {name: 'Both', code: 'both'},
                  {name: 'History', code: 'history'},
                  {name: 'Forecast', code: 'forecast'}
                ];
                this.type3 = [
                  {name: '3 days', code: '3 days'},
                  {name: 'Week', code: 'week'}
                ];

               }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getHistoryAndForecastByDayForDevice(id)
    this.getHistoryAndForecastByDayForAllDevicesByMonth(id)
    this.getHistoryAndForecastByDayForAllDevicesByYear(id)
    if (id){
      this.deviceService.getDeviceById(id)
        .subscribe(device => {
          this.device = device;
          if(!this.device){
            this.navigateToDevices();
          }

          this.deviceTypesService.getAllDeviceTypes().pipe(
            map(deviceTypes => {
              return Object.entries(deviceTypes).map(([code, name]) => ({ code, name }));
            }),
            tap(() => this.typeSelected = { code: this.device.deviceType, name: this.device.deviceType }),
            ).subscribe(mappedDeviceTypes => {
              this.types = mappedDeviceTypes;

              this.modelTypesService.getAllModelTypes(this.typeSelected.code).pipe(
                map(modelTypes => {
                  return Object.entries(modelTypes).map(([code, name]) => ({ code, name }));
                }),
                tap(() => this.modelSelected = { code: this.device.deviceModel, name: this.device.deviceModel }),
              ).subscribe(mappedModelTypes => {
                this.models = mappedModelTypes;
              });
          });
          
          this.roomTypesService.getAllRoomTypes().pipe(
            map(roomTypes => {
              return Object.entries(roomTypes).map(([code, name]) => ({ code, name }));
            }),
            tap(() => this.roomSelected = { code: this.device.room, name: this.device.room }),
          ).subscribe(mappedRoomTypes => {
            this.rooms = mappedRoomTypes;
          });
          
          this.nameSelected = this.device.deviceName;
          this.getUsageToday();
          this.getUsageWeek();
          this.getUsageMonth();
          this.getUsageYear();
          this.getMaxMinAvgTotalPowerUsageByTimeForDevice();
      });

    } else{
      this.navigateToDevices();
    }
  }

  navigateToDevices(): void {
    this.router.navigateByUrl("devices");
  }

  showEditDeviceDialog() {
    this.displayEditDeviceDialog = true;
  }

  showDialog(){
    this.display3 = !this.display3 ;
  }

  async handleVisibilitySwitchChange(){
    await lastValueFrom(this.deviceService.updateDevice(this.device));
  }

  async handleManagementSwitchChange(){
    await lastValueFrom(this.deviceService.updateDevice(this.device));
  }

  async handleRunningSwitchChange(){
    await lastValueFrom(this.deviceService.updateDevice(this.device));
  }

  save(){
    this.device.deviceModel = this.modelSelected.name;
    this.device.deviceType = this.typeSelected.name;
    this.device.room = this.roomSelected.name;
    this.device.deviceName = this.nameSelected;
    this.deviceService.updateDevice(this.device).subscribe(
      (updatedDevice: DeviceDTO) => {
        this.displayEditDeviceDialog = false;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  cancel(){
    const id = this.device.id.toString();
    this.deviceService.getDeviceById(id)
        .subscribe(device => {
          this.device = device;
          if(!this.device){
            this.navigateToDevices();
          }
      });
    this.displayEditDeviceDialog = false;
  }

  deleteDevice(id: number) {
    this.deviceService.deleteDevice(id).subscribe(() => {
      this.navigateToDevices();
    });
  }



  History = [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null];
  Forecast= [null,null, null, null, null, null,5,10,12,3,16,5,10,5];
  miniHistory = [12, 19, 3, 5, 2, 6, 5];
  miniForecast= [5,10,12,3,16,5,10];

  arrayData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  arrayData1 = [1,2,3,4,5,6,7];
  arrayData2 = [8,9,10,11,12,13,14];

  miniarrayData1 = [1,2,3,4,5,6,7];
  miniarrayData2 = [8,9,10,11,12,13,14];

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

  HistoryCon3:any  = [12, 19, 3, 5, 2, 6];
  ForecastCon3:any = [12, 19, 3, 5, 2, 6];
  HistoryPro3:any  = [12, 19, 3, 5, 2, 6];
  ForecastPro3:any = [12, 19, 3, 5, 2, 6];
  HistoryStock3:any  = [12, 19, 3, 5, 2, 6];
  ForecastStock3:any  = [12, 19, 3, 5, 2, 6];

  dates = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  arrayData3 = [1,2,3,4,5,6];


  getHistoryAndForecastByDayForDevice(id:any) {
    this.deviceService.getHistoryAndForecastByDayForDevice(id,"week").subscribe(data => {
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));
        this.miniarrayData1=data.dates.slice(0, 7);
        this.miniarrayData2=data.dates.slice(8, 14);

        this.dates = this.arrayData;
        this.loader = false;
        this.HistoryCon = data.datas.map((val: number) => +val.toFixed(2));
        this.ForecastCon = data.datas.map((val: number) => +val.toFixed(2));

        for (let i = 7; i < 14; i++) {
          // this.HistoryCon[i] = null;
          // this.HistoryPro[i] = null;
          // this.HistoryStock[i] = null;
          this.HistoryCon[i] = null;
          this.HistoryPro[i] = null;
          this.HistoryStock[i] = null;
        }

        this.miniHistoryCon = data.datas.slice(0, 7).map((val: number) => +val.toFixed(2));
        this.miniForecastCon = data.datas.slice(8,14).map((val: number) => +val.toFixed(2));

        this.miniHistoryPro = data.datas.slice(0, 7).map((val: number) => +val.toFixed(2));
        this.miniForecastPro = data.datas.slice(8,14).map((val: number) => +val.toFixed(2));


        this.miniHistoryStock = data.datas.slice(0, 7).map((val: number) => +val.toFixed(2));
        this.miniForecastStock = data.datas.slice(8,14).map((val: number) => +val.toFixed(2));

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

  getHistoryAndForecastByDayForAllDevicesByMonth(id:any) {
    this.deviceService.getHistoryAndForecastByDayForDevice(id,"monthhistory").subscribe(data => {
      this.arrayDataM = data.dates; //.slice(0, 7).concat(data.dates.slice(8));
      this.HistoryConM = data.datas.map((val: number) => +val.toFixed(2));
      this.HistoryProM = data.datas.map((val: number) => +val.toFixed(2));
      this.HistoryStockM = data.datas.map((val: number) => +val.toFixed(2));

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

  getHistoryAndForecastByDayForAllDevicesByYear(id:any) {
    this.deviceService.getHistoryAndForecastByDayForDevice(id,"year").subscribe(data => { 
      this.HistoryConY = data.datas.map((val: number) => +val.toFixed(2));
      this.HistoryProY = data.datas.map((val: number) => +val.toFixed(2));
      this.HistoryStockY = data.datas.map((val: number) => +val.toFixed(2));

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
  
    return months;
  }

  
table = true;
tableHiFWeek = true;
name:string="Consumption history"
isForecastTrue = true;

  dropdownChange()
  {
    this.getMaxMinAvgTotalPowerUsageByTimeForDevice();
    this.isForecastTrue = true;
    this.tableHiFWeek = false;
    this.table = false;
    this.color1 = '#46c5f1';
      this.color2 = '#88dbf6';
      if(this.selectedDate.code == "week" && this.selectedHF.code == "both")
      {
        this.tableHiFWeek = true;
        this.miniHistory=this.miniHistoryCon;
        this.miniForecast=this.miniForecastCon;


        this.max=this.Consumermax;
        this.min= this.Consumermin;
        this.average=this.Consumeraverage;
        this.total=this.Consumertotal;

      
        this.History = this.HistoryCon;
        this.Forecast = this.ForecastCon;

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








  UsageToday: any;
  Today: any;
  
  getUsageToday() {
    const time = 'day';
    const id = this.device.id;

    this.deviceService.getUsage(id,time).subscribe((response: any) => {
    this.UsageToday=response?.Consumer|| response?.Stock || response?.Producer;
     //console.log(this.UsageToday);
     this.Today=this.UsageToday.toFixed(2);
    });
  }

  UsageWeek: any;
  Week: any;
  getUsageWeek() {
    const time = 'week';
    const id = this.device.id;

    this.deviceService.getUsage(id,time).subscribe((response: any) => {
    this.UsageWeek=response?.Consumer|| response?.Stock || response?.Producer;
   // console.log(this.UsageWeek);
    this.Week=this.UsageWeek.toFixed(2);
    });
  }

  UsageMonth: any;
  Month: any;
  getUsageMonth() {
    const time = 'month';
    const id = this.device.id;

    this.deviceService.getUsage(id,time).subscribe((response: any) => {
    this.UsageMonth=response?.Consumer|| response?.Stock || response?.Producer;
    // console.log(this.UsageMonth);
     this.Month=this.UsageMonth.toFixed(2);
    });
  }

  UsageYear: any;
  Year: any
  getUsageYear() {
    const time = 'year';
    const id = this.device.id;

    this.deviceService.getUsage(id,time).subscribe((response: any) => {
    this.UsageYear=response?.Consumer|| response?.Stock || response?.Producer;
    this.UsageYear.toFixed(2);
    //console.log(this.UsageYear);
    this.Year=this.UsageYear.toFixed(2);
    });
  }

  total: any;
  average: any;
  min: any;
  max: any;

  Consumertotal: any;
  Consumeraverage: any;
  Consumermin: any;
  Consumermax: any;

  TitleMin!: String;
  TittleMax!: String;
  TitleAverage!: String;
  TitleTotal!:String;

  SubTitleToday!:String;
  SubTitleWeek!:String;
  SubTitleMonth!:String;
  SubTitleYear!:String;
  SubTitleAll!:String;

  dataMin: any;
dataMax: any;
theDay = "On the day: ";


  getMaxMinAvgTotalPowerUsageByTimeForDevice() {
    const id = this.device.id;
    const timeType = this.selectedDate.code;



    this.deviceService.getMaxMinAvgTotalPowerUsageByTimeForDevice(id,timeType).subscribe(data => {
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

      console.log(this.device.deviceType);
      if(this.device.deviceType=="Stock")
      {
        if(this.selectedDate.code == "week")
        {
          this.TitleMin='Minimal stocked electricity this week';
          this.TittleMax='Maximum stocked electricity this week';
          this.TitleAverage='Average stocked electricity this week';
          this.TitleTotal='Total stocked electricity this week';
          this.theDay = "On the day: ";
        }
        else if(this.selectedDate.code == "3 days")
        {
          this.TitleMin='Minimal stocked electricity by 3 days';
          this.TittleMax='Maximum stocked electricity by 3 days';
          this.TitleAverage='Average stocked electricity by 3 days';
          this.TitleTotal='Total stocked electricity by 3 days';
          this.theDay = "On the day: ";
        }
        else if(this.selectedDate.code == "month")
        {
          this.TitleMin='Minimal stocked electricity this month';
          this.TittleMax='Maximum stocked electricity this month';
          this.TitleAverage='Average stocked electricity this month';
          this.TitleTotal='Total stocked electricity this month';
          this.theDay = "On the day: ";
        }
        else
        {
          this.TitleMin='Minimal stocked electricity this year';
         this.TittleMax='Maximum stocked electricity this year';
          this.TitleAverage='Average stocked electricity this year';
         this.TitleTotal='Total stocked electricity this year';
         this.theDay = "On the month: ";
        }
        

        this.SubTitleToday='Stock Today';
        this.SubTitleWeek='Stock this week';
        this.SubTitleMonth='Stock this month';
        this.SubTitleYear='Stock this year';
        this.SubTitleAll='Stock all time';
      }
      else if(this.device.deviceType=="Consumer")
      {
        if(this.selectedDate.code == "week")
        {
          this.TitleMin='Minimal consumed electricity this week';
        this.TittleMax='Maximum consumed electricity this week';
        this.TitleAverage='Average consumed electricity this week';
        this.TitleTotal='Total consumed electricity this week';
        this.theDay = "On the day: ";
        }
        else if(this.selectedDate.code == "3 days")
        {
          this.TitleMin='Minimal consumed electricity by 3 days';
          this.TittleMax='Maximum consumed electricity by 3 days';
          this.TitleAverage='Average consumed electricity by 3 days';
          this.TitleTotal='Total consumed electricity by 3 days';
          this.theDay = "On the day: ";
        }
        else if(this.selectedDate.code == "month")
        {
          this.TitleMin='Minimal consumed electricity this month';
        this.TittleMax='Maximum consumed electricity this month';
        this.TitleAverage='Average consumed electricity this month';
        this.TitleTotal='Total consumed electricity this month';
        this.theDay = "On the day: ";
        }
        else
        {
          this.TitleMin='Minimal consumed electricity this year';
          this.TittleMax='Maximum consumed electricity this year';
          this.TitleAverage='Average consumed electricity this year';
          this.TitleTotal='Total consumed electricity this year';
          this.theDay = "On the month: ";
        }

        this.SubTitleToday='Consumption Today';
        this.SubTitleWeek='Consumption this week';
        this.SubTitleMonth='Consumption this month';
        this.SubTitleYear='Consumption this year';
        this.SubTitleAll='Consumption all time';
      }
      else
      {
        if(this.selectedDate.code == "week")
        {
          this.TitleMin='Minimal produced electricity this week';
      this.TittleMax='Maximum produced electricity this week';
      this.TitleAverage='Average produced electricity this week';
      this.TitleTotal='Total produced electricity this week';
      this.theDay = "On the day: ";
        }
        else if(this.selectedDate.code == "3 days")
        {
          this.TitleMin='Minimal produced electricity by 3 days';
        this.TittleMax='Maximum produced electricity by 3 days';
        this.TitleAverage='Average produced electricity by 3 days';
        this.TitleTotal='Total produced electricity by 3 days';
        this.theDay = "On the day: ";
        }
        else if(this.selectedDate.code == "month")
        {
          this.TitleMin='Minimal produced electricity this month';
        this.TittleMax='Maximum produced electricity this month';
        this.TitleAverage='Average produced electricity this month';
        this.TitleTotal='Total produced electricity this month';
        this.theDay = "On the day: ";
        }
        else
        {
          this.TitleMin='Minimal produced electricity this year';
        this.TittleMax='Maximum produced electricity this year';
        this.TitleAverage='Average produced electricity this year';
        this.TitleTotal='Total produced electricity this year';
        this.theDay = "On the month: ";
        }

        this.SubTitleToday='Production Today';
        this.SubTitleWeek='Production this week';
        this.SubTitleMonth='Production this month';
        this.SubTitleYear='Production this year';
        this.SubTitleAll='Production all time';
      }

      // console.log(this.max);
      // console.log(this.min);
      // console.log(this.total);
      // console.log(this.average);

  });
}

}
