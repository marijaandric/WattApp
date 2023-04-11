import { Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import axios from 'axios';


@Component({
  selector: 'app-users-operators',
  templateUrl: './users-operators.component.html',
  styleUrls: ['./users-operators.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersOperatorsComponent implements OnInit {
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

