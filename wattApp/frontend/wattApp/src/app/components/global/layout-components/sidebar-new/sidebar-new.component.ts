import { Component, EventEmitter, Output, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { APIService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

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
  lightMode: Boolean = true;
  isAdminRole: Boolean = false;

  hostElement: HTMLElement | undefined;
  @Output() toggleEventEmitter = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef, private api : APIService, private auth:AuthService, private renderer: Renderer2,private authService:AuthService,private userService:UserService) {
  }

  async ngOnInit(): Promise<void> {
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement = this.elementRef.nativeElement as HTMLElement;
      this.lightMode = !dark;
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
    });

    this.role()
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    this.hostElement?.classList.toggle('close', !this.isSideBarExpanded);
    //light mode
    /*
    const innerElements = this.hostElement?.querySelectorAll('.main');
    
    const hostClose = this.hostElement?.querySelector('close');
    const hostOpen = this.hostElement?.querySelector('open');

  

    const arrow = this.hostElement?.querySelector('.sidebar-arrow');
    const sidebar = this.hostElement?.querySelectorAll('.main, .ng-star-inserted .main');
    const sidebar2 = this.hostElement?.querySelectorAll('.left');
    sidebar.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'light-theme-color-gray');
    });
    sidebar2.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'light-theme-color-gray');
    });

    this.renderer.addClass(arrow, 'light-theme-background-white');
    this.renderer.addClass(arrow, 'text-color-blue');
  
    this.hostElement?.classList.add('light-theme-background-white');

    /*dark mode
    const innerElements = this.hostElement?.querySelectorAll('.main');
    innerElements.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'dark-theme-color-gray');
    });
  
    this.hostElement?.classList.add('dark-theme-background-gray-gradient-3');
 */

    /*
    this.userService.isDark.subscribe(dark => {
      this.hostElement = this.elementRef.nativeElement as HTMLElement;
      if (dark) {
        const innerElements = this.hostElement?.querySelectorAll('.main');
        this.hostElement?.classList.toggle('dark-theme-bigger-shadow', true);
        this.hostElement?.classList.add('dark-theme-background-gray-gradient-1');
        innerElements?.forEach((innerElement: any) => {
          this.renderer.addClass(innerElement, 'dark-theme-color-gray');
        });
      } else {
        this.hostElement?.classList.toggle('light-theme-bigger-shadow', true);
        this.hostElement?.classList.add('light-theme-background-white');
        const text = this.hostElement?.querySelector('.item_title');
        this.renderer.addClass(text, 'light-theme-text-color-gray');
        this.hostElement?.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        this.hostElement?.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      }
    });*/
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
    if(userRole === 'operator' || userRole === 'admin')
      this.isAdminRole = true;
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
