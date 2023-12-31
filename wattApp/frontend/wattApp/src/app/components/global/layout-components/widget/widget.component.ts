import { Component, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit{
  hostElement: HTMLElement | undefined;

  @Input() subTitle : String ="Current price of electricity";
  @Input() Title : String ="9,051 din/kWh";

  @Input() @HostBinding("blue-color") public isBlue = false;
  @Input() @HostBinding("bg-blue-color") public isBgBlue = false;
  
  @Input() @HostBinding("yellow-color") public isYellow = false;
  @Input() @HostBinding("bg-yellow-color") public isBgYellow = false;
  
  @Input() @HostBinding("pink-color") public isPink = false;
  @Input() @HostBinding("bg-pink-color") public isBgPink = false;

  @Input() @HostBinding("orange-color") public isOrange = false;
  @Input() @HostBinding("bg-orange-color") public isBgOrange = false;
  user: any;
  lightMode: boolean = false;

  constructor (private elementRef: ElementRef, private renderer: Renderer2, private userService:UserService) {

  }


  async ngOnInit(): Promise<void> {
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement = this.elementRef.nativeElement as HTMLElement;
      this.lightMode = dark
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
      
    });
    
    this.hostElement?.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.hostElement?.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  
    
  }


  private onMouseEnter(): void {
    const text = this.hostElement?.querySelector('.item_title');

    this.renderer.addClass(text, 'color-white-imp');
  }

  private onMouseLeave(): void {
    const text = this.hostElement?.querySelector('.item_title');
    this.renderer.removeClass(text, 'color-white-imp');
  }

  
}
