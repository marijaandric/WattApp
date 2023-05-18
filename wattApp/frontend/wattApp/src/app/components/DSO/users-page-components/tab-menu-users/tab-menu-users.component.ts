import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-menu-users',
  templateUrl: './tab-menu-users.component.html',
  styleUrls: ['./tab-menu-users.component.css']
})
export class TabMenuUsersComponent implements OnInit{
  
  hostElement: HTMLElement | undefined;
  rola! : string;
  constructor(private router: Router, private userService:UserService, private elementRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.role();

    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    
    const text = this.hostElement?.querySelectorAll('.tab-title');
    text.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'ligh-theme-text-color-gray');
    });
    const icons = this.hostElement?.querySelectorAll('.tab-icon i');
    icons.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'ligh-theme-text-color-gray');
    });
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
