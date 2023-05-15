import { Component, EventEmitter, Output, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { APIService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar-new',
  templateUrl: './sidebar-new.component.html',
  styleUrls: ['./sidebar-new.component.scss']
})
export class SidebarNewComponent {
  isSideBarExpanded: boolean = false;
  isSubMenuShown: boolean = false;
  isSubMenu2Shown: boolean = false;
  roles:any;
  
  hostElement: HTMLElement | undefined;
  @Output() toggleEventEmitter = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef,private api : APIService, private auth:AuthService, private renderer: Renderer2,private authService:AuthService,private userService:UserService) {
  }

  ngOnInit(): void {
    this.role()
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    this.hostElement?.classList.toggle('close', !this.isSideBarExpanded);
    const innerElements = this.hostElement?.querySelectorAll('.main');
    innerElements.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'dark-theme-color-gray');
    });
  
    this.hostElement?.classList.add('dark-theme-background-gray-gradient-3');
  }

  expandSidebar() {
    this.isSideBarExpanded = !this.isSideBarExpanded;
    this.hostElement?.classList.toggle('open', this.isSideBarExpanded);
    this.hostElement?.classList.toggle('close', !this.isSideBarExpanded);
    this.toggleEventEmitter.emit(this.isSideBarExpanded);
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
    this.auth.logout();
  }

  showSubMenu() {
    this.isSubMenuShown = !this.isSubMenuShown;
    
  }

  isAdmin(): boolean {
    const token = this.authService.getToken();
    if (!token) {
      return false;
    }
    const userRole = this.userService.getUserRoleFromToken(token);
    return userRole === 'operator' || userRole === 'admin' || userRole === 'superadmin';
  }

  role()
  {
    const token = localStorage.getItem('token')
    if(token)
    {
      this.roles = this.userService.getUserRoleFromToken(token);
      return this.roles ;
    }
    return null;
    
  }
}
