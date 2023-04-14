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


  arrayData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  name1 = "history";
  name2 = "forecast";

  color1 = '#f5805a';
  color2 = '#f9b59f';

  getHistoryAndForecastByDayForAllDevices() {
    this.deviceService.GetHistoryAndForecastByDayForAllDevices().subscribe(data => {
      if (this.selectedType.code == 'Consumer') {
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));

        this.History = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));
        this.Forecast = data.totaldatasConsumer.map((val: number) => +val.toFixed(2));

        for (let i = 8; i < 14; i++) {
          this.History[i] = null;
        }

        for (let i = 0; i < 7; i++) {
          this.Forecast[i] = null;
        }

        this.name1="Consumption history";
        this.name2="Consumption forecast";

        this.color1 = '#f5805a';
        this.color2 = '#f9b59f';
      }

      else if (this.selectedType.code == 'Producer') {
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));

        this.History = data.totaldatasProducer.map((val: number) => +val.toFixed(2));
        this.Forecast = data.totaldatasProducer.map((val: number) => +val.toFixed(2));

        for (let i = 8; i < 14; i++) {
          this.History[i] = null;
        }

        for (let i = 0; i < 7; i++) {
          this.Forecast[i] = null;
        }

        this.name1="Production history";
        this.name2="Production forecast";

        this.color1 = '#46c5f1';
        this.color2 = '#71d3f4';
      }

      else if (this.selectedType.code == 'Stock') {
        this.arrayData = data.dates; //.slice(0, 7).concat(data.dates.slice(8));

        this.History = data.totaldatasStock.map((val: number) => +val.toFixed(2));
        this.Forecast = data.totaldatasStock.map((val: number) => +val.toFixed(2));

        for (let i = 8; i < 14; i++) {
          this.History[i] = null;
        }

        for (let i = 0; i < 7; i++) {
          this.Forecast[i] = null;
        }

        this.name1="Stock history";
        this.name2="Stock forecast";

        this.color1 = '#885ec0';
        this.color2 = '#ae91d4';
      }

      console.log(this.History);
      console.log(this.Forecast);

      // console.log(this.arrayData);
    });
  }


  dropdownChange()
  {
    console.log(this.selectedType);
    this.getHistoryAndForecastByDayForAllDevices();
   
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
