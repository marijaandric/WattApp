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

  constructor (private elementRef: ElementRef, private renderer: Renderer2, private userService:UserService) {

  }


  ngOnInit(): void {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    if(this.userService.isDark)
    {
      const innerElements = this.hostElement?.querySelectorAll('.main');
      innerElements.forEach((innerElement) => {
        this.renderer.addClass(innerElement, 'dark-theme-color-gray');
      });
    }
    else{
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', true);
      this.hostElement?.classList.add('light-theme-background-white');
      const text = this.hostElement?.querySelector('.item_title');
      this.renderer.addClass(text, 'ligh-theme-text-color-gray');
      this.hostElement.addEventListener('mouseenter', this.onMouseEnter.bind(this));
      this.hostElement.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    }
   

  }


  private onMouseEnter(): void {
    const text = this.hostElement?.querySelector('.item_title');
    if (text) {
      text.classList.add('color-white');
    }
  }

  private onMouseLeave(): void {
    const text = this.hostElement?.querySelector('.item_title');
    if (text) {
      text.classList.remove('color-white');
    }
  }

  
}
