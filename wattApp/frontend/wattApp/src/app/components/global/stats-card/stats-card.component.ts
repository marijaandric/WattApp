import { Component, ElementRef, HostBinding, Input, Renderer2} from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent {
  hostElement: HTMLElement | undefined;

  @Input() Title : String ="9,051 din/kWh";
  @Input() subTitle : String ="";
  @Input() value : String ="9,051 din/kWh";
  
  @Input() @HostBinding("icon") public hasIcon = true;
  @Input() @HostBinding("bg-blue-color") public isBgBlue = false;
  @Input() @HostBinding("bg-purple-color") public isBgPurple = false;
  @Input() @HostBinding("bg-pink-color") public isBgPink = false;
  @Input() @HostBinding("bg-orange-color") public isBgOrange = false;

  
  constructor (private elementRef: ElementRef, private renderer: Renderer2) {

  }


  ngOnInit(): void {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    /*const innerElements = this.hostElement?.querySelectorAll('.main');
    innerElements.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'dark-theme-color-gray');
    });
  */
    this.hostElement?.classList.add('light-theme-background-white');
    this.hostElement?.classList.toggle('light-theme-bigger-shadow', true);
    const main_text = this.hostElement?.querySelector('.main-stat-card span');
    const kwh_text = this.hostElement?.querySelector('.kwh-card span');
    const sub_text = this.hostElement?.querySelector('.subtitle-2 span');
    this.renderer.addClass(main_text, 'ligh-theme-text-color-gray');
    this.renderer.addClass(kwh_text, 'ligh-theme-text-color-gray');
    this.renderer.addClass(sub_text, 'ligh-theme-text-color-gray');
  }
}
