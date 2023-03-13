import { Component, ElementRef, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarShown: boolean = false;
  isSubMenuShown: boolean = false;
  isSubMenu2Shown: boolean = false;
  hostElement: HTMLElement | undefined;

  constructor(private elementRef: ElementRef,private api : APIService, private auth:AuthService) {
  }

  ngOnInit(): void {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    console.log(':host selector:', this.hostElement.tagName.toLowerCase());
  }

  showSidebar() {
    this.isSidebarShown = !this.isSidebarShown;
    this.hostElement?.classList.toggle('close', this.isSidebarShown);
  }

  showSubMenus() {
    this.isSubMenuShown = !this.isSubMenuShown;
    console.log(this.isSubMenuShown);
  }

  showSubMenus2() {
    this.isSubMenu2Shown = !this.isSubMenu2Shown;
    console.log(this.isSubMenu2Shown);
  }

  logout()
  {
    console.log("LOGOUT");
    this.auth.logout();
  }
}
/*import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarShown: boolean = false;
  isSubMenuShown: boolean = false;
  isSubMenu2Shown: boolean = false;

  showSidebar(){
    
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".menu");
    console.log(sidebarBtn);
    sidebar?.classList.toggle("close");
    let sidebar = document.
    this.isSidebarShown = !this.isSidebarShown;
  }

  showSubMenus() {
    this.isSubMenuShown = !this.isSubMenuShown;
    console.log(this.isSubMenuShown);
  }

  showSubMenus2() {
    this.isSubMenu2Shown = !this.isSubMenu2Shown;
    console.log(this.isSubMenu2Shown);
  }
}
*/

