import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
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
}
