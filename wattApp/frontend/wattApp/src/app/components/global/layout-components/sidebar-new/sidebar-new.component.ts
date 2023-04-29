import { Component, EventEmitter, Output, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { APIService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar-new',
  templateUrl: './sidebar-new.component.html',
  styleUrls: ['./sidebar-new.component.scss']
})
export class SidebarNewComponent {
  isSideBarExpanded: boolean = false;
  isSubMenuShown: boolean = false;
  isSubMenu2Shown: boolean = false;
  
  hostElement: HTMLElement | undefined;
  @Output() toggleEventEmitter = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef,private api : APIService, private auth:AuthService, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const innerElements = this.hostElement?.querySelectorAll('.left');
    innerElements.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'dark-theme-color-gray');
    });
  
    this.hostElement?.classList.add('dark-theme-background-gray-gradient-3');
  }

  expandSidebar() {
    this.isSideBarExpanded = !this.isSideBarExpanded;
    this.hostElement?.classList.toggle('open', this.isSideBarExpanded);
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
}
