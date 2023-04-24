import { Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import axios from 'axios';
import { url } from 'src/app/app.module';

@Component({
  selector: 'app-users-prosumers',
  templateUrl: './users-prosumers.component.html',
  styleUrls: ['./users-prosumers.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UsersProsumersComponent implements OnInit {
  baseUrl = url + "/api/Images/user/";
  users: UserDTO[] = [];
  constructor(private userService: UserService) {

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
