import { Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'standard-template',
  templateUrl: './stadard-template.component.html',
  styleUrls: ['./stadard-template.component.css']
})
export class StadardTemplateComponent {
  hostElement: HTMLElement | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement?.classList.toggle('dark-theme-application-background', dark);
      this.hostElement?.classList.toggle('light-theme-application-background', !dark);
    });

    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    console.log(':host selector:', this.hostElement.tagName.toLowerCase());
    const sidebar = this.hostElement?.querySelector('.sidebar');
    this.renderer.addClass(sidebar, 'light-theme-bigger-shadow');
  }

  showSidebar(isShown: boolean): void {
    this.hostElement?.classList.toggle('sidebar-opened', isShown);
  }
}
