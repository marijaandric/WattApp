import { Component, ElementRef, Renderer2 } from '@angular/core';
import { StadardTemplateComponent } from '../../global/layout-components/standard-template/stadard-template.component';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmationService } from 'primeng/api';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserDTO } from 'src/app/dtos/UserDTO';
import { UserService } from 'src/app/services/user/user.service';


interface City {
  name: string,
  code: string
}

interface HiF{
  history: any,
  forecast: any,
  date1: any,
  date2: any
}

@Component({
  selector: 'app-home-dso',
  templateUrl: './home-dso.component.html',
  styleUrls: ['./home-dso.component.css']
})


export class HomeDSOComponent {
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  display4: boolean = false;
  display5: boolean = false;
  display6: boolean = true;

  menageUserForm! : FormGroup;
  cities: City[];
  selectedCity!: City;
  type: City[];
  selectedType!: City;
  isConsumption: boolean = true;
  isProduction: boolean = false;
  isStock: boolean = false;
  isAll: boolean = false;

  hif : HiF[]  = [{history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []}];

  constructor(private deviceService : DeviceService,private userService:UserService, private authService:AuthService, private elementRef: ElementRef, private renderer: Renderer2) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
    this.type = [
      {name: 'Consumption', code: 'Consumer'},
      {name: 'Production', code: 'Producer'},
      {name: 'Stock', code: 'Stock'},
    ];

    
  }

  changeBg(selectedType: City) {
    /*
    const element =document.getElementById('::ng-deep .pr_id_1_labelt');
    if(selectedType.code == '1')
    {
      this.renderer.addClass(element, 'consumption');
      this.isConsumption = true;
      this.isProduction = false;
      this.isStock = false;
      this.isAll = false;

    } else if (selectedType.code == '2') {
      this.renderer.addClass(element, 'production');
      this.isConsumption = false;
      this.isProduction = true;
      this.isStock = false;
      this.isAll = false;
    } else if (selectedType.code == '3') {
      this.renderer.addClass(element, 'stock');
      this.isConsumption = false;
      this.isProduction = false;
      this.isStock = true;
      this.isAll = false;
    } else {
      this.renderer.addClass(element, 'all');
      this.isConsumption = false;
      this.isProduction = false;
      this.isStock = false;
      this.isAll = true;
    }*/
  }

  users: UserDTO[] = [];

  monthPowerUsageProducer: any;
  
  getmonthPowerUsageProducer() {
    const type = 'Producer';

    this.deviceService.getmonthDSO(type).subscribe((response: any) => {
      this.monthPowerUsageProducer=response.usage.toFixed(2);
      console.log(response.usage);
    });
  }

  monthPowerUsageConsumer: any;
  
  getmonthPowerUsageConsumer() {
    const type = 'Consumer';

    this.deviceService.getmonthDSO(type).subscribe((response: any) => {
      this.monthPowerUsageConsumer=response.usage.toFixed(2);
    });
  }

  monthPowerUsageStorage: any;

  getmonthPowerUsageStorage() {
    const type = 'Stock';

    this.deviceService.getmonthDSO(type).subscribe((response: any) => {
      this.monthPowerUsageStorage=response.usage.toFixed(2);
    });
  }

  dayPowerPrice: any;

  getdayPowerPrice() {
  
    this.deviceService.getprice().subscribe((response: any) => {
      this.dayPowerPrice=response.toFixed(2);
    });
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((result: UserDTO[]) => (this.users = result));
    this.getmonthPowerUsageConsumer();
    this.getmonthPowerUsageProducer();
    this.getmonthPowerUsageStorage();
    this.getHistoryAndForecastByDayForAllDevices();
    this.getdayPowerPrice();
  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }

  History = [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null];
  Forecast= [null,null, null, null, null, null,5,10,12,3,16,5,10,5];

  HistoryCon = [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null];
  ForecastCon= [null,null, null, null, null, null,5,10,12,3,16,5,10,5];
  HistoryPro = [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null];
  ForecastPro= [null,null, null, null, null, null,5,10,12,3,16,5,10,5];
  HistoryStock = [12, 19, 3, 5, 2, 6, 5, null,null,null,null, null, null, null];
  ForecastStock = [null,null, null, null, null, null,5,10,12,3,16,5,10,5];


  arrayData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  name1 = "history";
  name2 = "forecast";

  color1 = '#885ec0';
  color2 = '#ae91d4';

  getHistoryAndForecastByDayForAllDevices() {
    this.deviceService.GetHistoryAndForecastByDayForAllDevices().subscribe(data => {
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));

        this.HistoryCon = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
        this.ForecastCon = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
        this.HistoryPro = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
        this.ForecastPro = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
        this.HistoryStock = data.totaldatasStock.map((val: number) => +val.toFixed(2));
        this.ForecastStock = data.totaldatasStock.map((val: number) => +val.toFixed(2));

        for (let i = 8; i < 14; i++) {
          this.HistoryCon[i] = null;
          this.HistoryPro[i] = null;
          this.HistoryStock[i] = null;
        }

        for (let i = 0; i < 7; i++) {
          this.ForecastCon[i] = null;
          this.ForecastPro[i] = null;
          this.ForecastStock[i] = null;
        }

        this.History = this.HistoryCon;
        this.Forecast = this.ForecastCon;
        this.name1="Consumption history";
        this.name2="Consumption forecast";

        this.color1 = '#885ec0';
        this.color2 = '#ae91d4';

        for(let i = 0;i<7;i++)
        {
          this.hif[i].history = this.HistoryCon[i]
          this.hif[i].forecast = this.ForecastCon[i+7]
          this.hif[i].date1 = this.arrayData[i]
          this.hif[i].date2 = this.arrayData[i+7]
        }
      });
  }


  dropdownChange()
  {
    console.log(this.selectedType);
    if(this.selectedType.code == "Consumer")
    {
      this.History = this.HistoryCon;
      this.Forecast = this.ForecastCon;

      this.name1="Consumption history";
      this.name2="Consumption forecast";

      this.color1 = '#885ec0';
      this.color2 = '#ae91d4';

      for(let i = 0;i<this.History.length;i++)
      {
        this.hif[i].history = this.HistoryCon[i]
        this.hif[i].forecast = this.ForecastCon[i+7]
        this.hif[i].date1 = this.arrayData[i]
        this.hif[i].date2 = this.arrayData[i+7]
      }
    }
    else if(this.selectedType.code == "Producer")
    {
      this.History = this.HistoryPro;
      this.Forecast = this.ForecastPro;

      this.name1="Production history";
      this.name2="Production forecast";

      this.color1 = '#eb4886';
      this.color2 = '#f075a4';

      for(let i = 0;i<this.History.length;i++)
      {
        this.hif[i].history = this.HistoryPro[i]
        this.hif[i].forecast = this.ForecastPro[i+7]
        this.hif[i].date1 = this.arrayData[i]
        this.hif[i].date2 = this.arrayData[i+7]
      }
    }
    else{
      this.History = this.HistoryStock;
      this.Forecast = this.ForecastStock;

      this.name1="Stock history";
      this.name2="Stock forecast";

      this.color1 = '#f5805a';
      this.color2 = '#f9b59f';

      for(let i = 0;i<this.History.length;i++)
      {
        this.hif[i].history = this.HistoryStock[i]
        this.hif[i].forecast =   this.ForecastStock[i+7]
        this.hif[i].date1 = this.arrayData[i]
        this.hif[i].date2 = this.arrayData[i+7]
      }
    }
    console.log(this.hif)
   
  }




  //dijalozi

  showDialog() {
    this.display = true;
  }
  showDialog2() {
    this.display2 = true;
  }
  showDialog3() {
    this.display3 = true;
  }
  showDialog4() {
    this.display4 = true;
  }
  showDialog5() {
    this.display5 = true;
  }
  showDialog6() {
    this.display6 = true;
  }
}