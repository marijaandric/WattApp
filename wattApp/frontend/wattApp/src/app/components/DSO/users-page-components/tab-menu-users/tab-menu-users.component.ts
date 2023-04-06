import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-menu-users',
  templateUrl: './tab-menu-users.component.html',
  styleUrls: ['./tab-menu-users.component.css']
})
export class TabMenuUsersComponent implements OnInit{
  rola! : string;
  constructor(private router: Router, private userService:UserService) {}
  ngOnInit(): void {
    this.isAdmin();
  }

  goToAboutPage() {
    this.router.navigate(['/prosumerhome']);
  }

  isAdmin()
  {
    const token = localStorage.getItem('token')
    if(token)
    {
      this.rola = this.userService.getUserRoleFromToken(token)
      if(this.rola === "admin")
      {
        return true;
      }
      else if(this.rola === "superAdmin")
      {
        return true;
      }
      else{
        return false;
      }
    }
    return false;
    
  }
}
