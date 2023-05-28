import { Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import * as L from 'leaflet';
import { UserService } from 'src/app/services/user/user.service';

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

  lightMode: Boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private userService: UserService) {

  }

  
  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
      
    });
  }
}
