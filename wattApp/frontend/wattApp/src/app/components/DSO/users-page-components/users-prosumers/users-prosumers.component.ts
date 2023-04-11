import { Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import axios from 'axios';
import { DeviceService } from 'src/app/services/device/device.service';
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
  users: UserDTO[] = [];
  type: City[];
  selectedType!: City;

  constructor(private userService: UserService, private deviceService : DeviceService) {
    this.type = [
      {name: 'Consumption', code: '1'},
      {name: 'Production', code: '2'},
      {name: 'Stock', code: '3'},
      {name: 'All', code: '4'},
  ];
 }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((result: UserDTO[]) => (this.users = result));
  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }

}
