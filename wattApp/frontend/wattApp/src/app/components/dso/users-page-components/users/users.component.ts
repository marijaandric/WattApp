import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { url } from 'src/app/app.module';

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

  constructor(private userService: UserService, private deviceService : DeviceService) {
    this.type = [
      {name: 'Consumption', code: '1'},
      {name: 'Production', code: '2'},
      {name: 'Stock', code: '3'},
      {name: 'All', code: '4'},
  ];
 }

  ngOnInit() {
    //this.userService.getAllUsers().subscribe((result: UserDTO[]) => (this.users = result));
    this.userService.getUsersPaginationByRole("prosumer",this.currentPage,this.rowsPerPage).subscribe((result: UserDTO[])=>(this.loader=false,this.users = result))

  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }


}
