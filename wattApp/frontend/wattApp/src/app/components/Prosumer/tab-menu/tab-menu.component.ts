import { Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent {
  hostElement: HTMLElement | undefined;
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private userService: UserService) {}
  
  async ngOnInit(): Promise<void> {

    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
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
  }
}
