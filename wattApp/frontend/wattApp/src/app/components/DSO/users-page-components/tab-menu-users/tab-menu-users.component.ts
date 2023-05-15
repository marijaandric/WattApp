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
    this.role();
  }

  goToAboutPage() {
    this.router.navigate(['/prosumerhome']);
  }

  role()
  {
    const token = localStorage.getItem('token')
    if(token)
    {
      this.rola = this.userService.getUserRoleFromToken(token)
      return this.rola;
    }
    return null;
    
  }

}
