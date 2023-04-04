import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-menu-users',
  templateUrl: './tab-menu-users.component.html',
  styleUrls: ['./tab-menu-users.component.css']
})
export class TabMenuUsersComponent {
  constructor(private router: Router) {}

  goToAboutPage() {
    this.router.navigate(['/prosumerhome']);
  }
}
