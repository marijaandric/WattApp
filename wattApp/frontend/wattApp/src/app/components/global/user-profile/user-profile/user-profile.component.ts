import { Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  hostElement: HTMLElement | undefined;

  subTitle : String ="Get a discount!";
  Title : String ="Show us all your device, get a 10% discount! For more information, contact our operators! Dear consumers, we inform you that the price of electricity will decrease by 5% in the coming period.";

  @Input() @HostBinding("blue-color") public isBlue = false;
  @Input() @HostBinding("bg-blue-color") public isBgBlue = false;
  
  @Input() @HostBinding("yellow-color") public isYellow = false;
  @Input() @HostBinding("bg-yellow-color") public isBgYellow = false;
  
  @Input() @HostBinding("pink-color") public isPink = false;
  @Input() @HostBinding("bg-pink-color") public isBgPink = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit():void {
    
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const mapShadow = this.hostElement.querySelector('.slika');
    this.renderer.addClass(mapShadow, 'light-theme-bigger-shadow')

  }
}
