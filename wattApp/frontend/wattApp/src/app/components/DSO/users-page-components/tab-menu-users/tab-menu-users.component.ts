import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tab-menu-users',
  templateUrl: './tab-menu-users.component.html',
  styleUrls: ['./tab-menu-users.component.css']
})
export class TabMenuUsersComponent implements OnInit{
  lightMode:Boolean = false;
  hostElement: HTMLElement | undefined;
  rola! : string;
  constructor(private router: Router, private userService:UserService, private elementRef: ElementRef, private renderer: Renderer2) {}
  
  async ngOnInit(): Promise<void> {

    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
      if(!dark) {
        this.hostElement = this.elementRef.nativeElement as HTMLElement;
        const text = this.hostElement?.querySelectorAll('.tab-title');
        text.forEach((innerElement) => {
          this.renderer.removeClass(innerElement, 'color-white');
          this.renderer.addClass(innerElement, 'ligh-theme-text-color-gray');
        });
        const icons = this.hostElement?.querySelectorAll('.tab-icon i');
        icons.forEach((innerElement) => {
          this.renderer.removeClass(innerElement, 'color-white');
          this.renderer.addClass(innerElement, 'ligh-theme-text-color-gray');
        });
      }
     else {
        this.hostElement = this.elementRef.nativeElement as HTMLElement;
        const text = this.hostElement?.querySelectorAll('.tab-title');
        text.forEach((innerElement) => {
          this.renderer.removeClass(innerElement, 'ligh-theme-text-color-gray');
          this.renderer.addClass(innerElement, 'color-white');
        });
        const icons = this.hostElement?.querySelectorAll('.tab-icon i');
        icons.forEach((innerElement) => {
          this.renderer.removeClass(innerElement, 'ligh-theme-text-color-gray');
          this.renderer.addClass(innerElement, 'color-white');
        });
      }
    });
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
