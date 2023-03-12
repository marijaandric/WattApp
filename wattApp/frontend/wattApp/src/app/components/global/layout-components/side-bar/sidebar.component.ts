import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  ngOnInit(): void {
    
  }

  constructor(private api : APIService, private auth:AuthService){}

  list = [
    {
      number: '1',
      name:'Home',
      icon:'fa-solid fa-house',
    },
    {
      number: '2',
      name:'Users',
      icon:'fa fa-users',
    },
    {
      number: '1',
      name:'Dashboard',
      icon:'fa-solid fa-house',
    },
    {
      number: '1',
      name:'Settings',
      icon:'fa-solid fa-house',
    },
  ];

  logout()
  {
    this.auth.logout();
  }

}
