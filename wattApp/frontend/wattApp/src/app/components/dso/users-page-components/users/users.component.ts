import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { url } from 'src/app/app.module';
import { APIService } from 'src/app/services/api/api.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit{
  baseUrl = url + "/api/Images/user/";
  users: UserDTO[] = [];
  type: City[];
  selectedType!: City;
  currentPage :any = 0;
  rowsPerPage :any = 2;
  loader=true;

  constructor(private aPIService: APIService, private userService: UserService, private deviceService : DeviceService) {
    this.type = [
      {name: 'Consumption', code: 'Consumer'},
      {name: 'Production', code: 'Producer'},
      {name: 'Stock', code: 'Stock'}
  ];
  this.selectedType = {name: 'Consumption', code: 'Consumer'};
  this.options = [

];

 }

  ngOnInit() {
    //this.userService.getAllUsers().subscribe((result: UserDTO[]) => (this.users = result));
    this.userService.getUsersPaginationByRole("prosumer",this.currentPage,this.rowsPerPage).subscribe((result: UserDTO[])=>(this.loader=false,this.users = result))
    this.getAreas();
    //this.getPowerUsageForAllTypesForArea();
    //this.getChartArea();
  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }

  options : City [];
  selectedOption: City={name: "", code: ""};

  getAreas() {
    this.aPIService.getAreas().subscribe((response: any) => {
      this.options = response.map((option: string) => {
        return {
          name: option,
          code: option
        };
      });
      this.selectedOption=this.options[0];
      console.log(this.selectedOption);
    //  console.log(this.type);
    this.getPowerUsageForAllTypesForArea();
    });

  }
  onDropdownChange() {
    //console.log(this.selectedOption);
    this.getPowerUsageForAllTypesForArea();
    //this.getChartArea();

  }

  count: number[]=[0,0,0];
  boris=[1,2,3];
  naziv: string = "";

  c: any;
  p: any;
  s: any;
  getPowerUsageForAllTypesForArea() {
    const deviceType = this.selectedOption.code;
    console.log(this.selectedOption.code);
    this.naziv=this.selectedOption.code;
    const timeType = "week"; 
    //this.count = []
    this.deviceService.getPowerUsageForAllTypesForArea(deviceType,timeType).subscribe((data: any) => {
    //  this.count[0] = data.Consumer;
    //  this.count[1] = data.Producer;
    //  this.count[2] = data.Stock;
     
     this.count = [data.Consumer,data.Producer,data.Stock];
     console.log("USLo")
     console.log(this.count)
    });

  }
  keys: string[] = [];
  values: number[] = [];

  getChartArea() {
    const deviceType = this.selectedType.code;
    console.log(this.selectedType.code);

    const number = 4;
    this.keys.splice(0, this.keys.length);
    this.values.splice(0, this.values.length);
    this.deviceService.getChartArea(deviceType,number).subscribe((data: any) => {
    this.keys.splice(0, this.keys.length);
    this.values.splice(0, this.values.length);
      console.log(data);
      for (const key in data) {
        this.keys.push(key);
        this.values.push(data[key]);
      }
    });

  console.log(this.keys);
  console.log(this.values);
  }


}
