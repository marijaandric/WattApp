import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { url } from 'src/app/app.module';
import { APIService } from 'src/app/services/api/api.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-users-prosumers',
  templateUrl: './users-prosumers.component.html',
  styleUrls: ['./users-prosumers.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UsersProsumersComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef;
  lightMode: Boolean = true;
  baseUrl = url + "/api/Images/user/";
  users: UserDTO[] = [];
  users2:UserDTO[] = []
  type: City[];
  selectedType!: City;
  currentPage :any = 0;
  rowsPerPage :any = 10;
  allUsersCount!: number;
  loader=true;

  constructor(private aPIService: APIService, 
              private userService: UserService, 
              private deviceService : DeviceService) {
    this.type = [
      {name: 'Consumption', code: 'Consumer'},
      {name: 'Production', code: 'Producer'},
      {name: 'Stock', code: 'Stock'}
    ];

    this.selectedType = {name: 'Consumption', code: 'Consumer'};
    this.options = [];
  }

  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
     
    });
    this.userService.getCountDataByType("prosumer").subscribe(result => this.allUsersCount = result);
    this.refreshAllUsers();
  }

  clear(dtUsers: any) {
    this.searchInput.nativeElement.value = '';
    dtUsers.clear();
    this.users2 = this.users
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
    setTimeout(() => {
      this.users2 = dtUsers.filteredValue;
      if(this.users2 == undefined || this.users2 == null)
      {
        this.users2 = this.users
      }
    }, 500);
  }

  onFilter(event: any) {
    const filteredValues = event.filteredValue;
    setTimeout(() => {
      this.users2 = filteredValues
      if(this.users2 == undefined || this.users2 == null)
      {
        this.users2 = this.users
      }
    }, 500);
  }
  

  onPageChange(event: any) {
    this.rowsPerPage = this.rowsPerPage; // implement changing of page size
    this.currentPage = event.first/this.rowsPerPage;
    this.refreshAllUsers();
  }

  private refreshAllUsers(){
    this.userService.getUsersPaginationByRole("prosumer",this.currentPage,this.rowsPerPage).subscribe((result: UserDTO[])=>(this.loader=false,this.users = result,this.users2=result));
    this.getAreas();
    //this.getPowerUsageForAllTypesForArea();
    this.getChartArea();
  }

  options : City [];
  selectedOption: City={name: "", code: ""};

  getAreas() {
    this.aPIService.getAreas().subscribe((response: any) => {
      console.log(response);
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
    // this.getChartArea();

  }
  onDropdownChange2() {
    //console.log(this.selectedOption);
    // this.getPowerUsageForAllTypesForArea();
    this.getChartArea();

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
     
    });

  }
  keys: string[] = [];
  values: number[] = [];

  getChartArea() {
    const deviceType = this.selectedType.code;

    const number = 4;
    // this.keys.splice(0, this.keys.length);
    // this.values.splice(0, this.values.length);
    this.deviceService.getChartArea(deviceType,number).subscribe((data: any) => {
    // this.keys.splice(0, this.keys.length);
    // this.values.splice(0, this.values.length);
      this.keys = []
      this.values=[]
      for (const key in data) {
        this.keys.push(key);
        this.values.push(data[key]);
      }
      console.log(this.values)
    });
  }


}