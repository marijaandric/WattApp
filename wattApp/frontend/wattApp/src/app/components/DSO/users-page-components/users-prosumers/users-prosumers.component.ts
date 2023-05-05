import { Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import axios from 'axios';
import { url } from 'src/app/app.module';
import { APIService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-users-prosumers',
  templateUrl: './users-prosumers.component.html',
  styleUrls: ['./users-prosumers.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UsersProsumersComponent implements OnInit {
  baseUrl = url + "/api/Images/user/";
  users: UserDTO[] = [];
  loader=true;
  constructor(private userService: UserService, private aPIService: APIService) {

 }

numberOFAllUsers: any;
numberOFProsumer: any;
numberOFOperator: any;

 getNumber() {

  this.aPIService.getNumber().subscribe((response: any) => {
    this.numberOFAllUsers=response.All;
    this.numberOFProsumer=response.Prosumer;
    this.numberOFOperator=response.Other;
  //  console.log(this.numberOFAllUsers);
  //  console.log(this.numberOFProsumer);
  //  console.log(this.numberOFOperator);
  });

}

  ngOnInit() {
    this.getNumber();
    this.userService.getAllUsers().subscribe((result: UserDTO[]) => (this.loader = false,this.users = result));
      
  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }

}
