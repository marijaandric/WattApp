import { Component } from '@angular/core';
import { StadardTemplateComponent } from '../../layout-components/standard-template/stadard-template.component';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  menageUserForm! : FormGroup;
  
  constructor(private userService:UserService, private authService:AuthService) {}

  showDialog() {
      this.display = true;
  }

  showDialog2() {
    this.display2 = true;
  }
  showDialog3() {
    this.display3 = true;
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
