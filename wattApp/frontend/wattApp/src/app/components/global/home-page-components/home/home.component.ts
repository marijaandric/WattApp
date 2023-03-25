import { Component } from '@angular/core';
import { StadardTemplateComponent } from '../../layout-components/standard-template/stadard-template.component';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmationService } from 'primeng/api';
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  display4: boolean = false;
  display5: boolean = false;
  display6: boolean = false;

  menageUserForm! : FormGroup;
  cities: City[];
  selectedCity!: City;
  type: City[];
  selectedType!: City;


  constructor(private userService:UserService, private authService:AuthService) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  this.type = [
    {name: 'Production', code: 'NY'},
    {name: 'Consumption', code: 'RM'},
    {name: 'Stock', code: 'LDN'},
    {name: 'All', code: 'IST'},
];
  }


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

  isAdmin()
  {
    const token = this.authService.getToken();
    if(token)
    {
      const role = this.userService.getUserRoleFromToken(token);
      if(role == "prosumer")
      {
        return false;
      }
      else{
        return true;
      }
      
    }
    else{
      return false;
    }
    
  }
}
