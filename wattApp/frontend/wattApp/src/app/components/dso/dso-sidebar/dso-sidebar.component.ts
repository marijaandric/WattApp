import { Component } from '@angular/core';

@Component({
  selector: 'app-dso-sidebar',
  templateUrl: './dso-sidebar.component.html',
  styleUrls: ['./dso-sidebar.component.css']
})
export class DsoSidebarComponent {
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
