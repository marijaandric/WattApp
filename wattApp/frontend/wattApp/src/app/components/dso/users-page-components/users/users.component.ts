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
      {name: 'Consumption', code: '1'},
      {name: 'Production', code: '2'},
      {name: 'Stock', code: '3'}
  ];
  this.options = [

];

 }

  ngOnInit() {
    //this.userService.getAllUsers().subscribe((result: UserDTO[]) => (this.users = result));
    this.userService.getUsersPaginationByRole("prosumer",this.currentPage,this.rowsPerPage).subscribe((result: UserDTO[])=>(this.loader=false,this.users = result))
    this.getAreas();
    this.getPowerUsageForAllTypesForArea();
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

  }

  count: number[]=[];
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
    this.count.splice(0, this.count.length);
    this.deviceService.getPowerUsageForAllTypesForArea(deviceType,timeType).subscribe((data: any) => {
      this.count.splice(0, this.count.length);
     this.count.push(data.Consumer);
     this.count.push(data.Producer);
     this.count.push(data.Stock);
    });

    console.log(this.count);
    console.log(this.boris);
  }


}
