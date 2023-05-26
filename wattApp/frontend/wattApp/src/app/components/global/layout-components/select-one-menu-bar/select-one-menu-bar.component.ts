import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-select-one-menu-bar',
  templateUrl: './select-one-menu-bar.component.html',
  styleUrls: ['./select-one-menu-bar.component.css']
})
export class SelectOneMenuBarComponent implements OnInit{

  hostElement: HTMLElement | undefined;

  constructor (private elementRef: ElementRef, private renderer: Renderer2, private userService: UserService) {

  }

  async ngOnInit(): Promise<void> {
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement = this.elementRef.nativeElement as HTMLElement;
      
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
    });
  }

}
