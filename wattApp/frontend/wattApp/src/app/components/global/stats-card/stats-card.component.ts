import { Component, ElementRef, HostBinding, Input, Renderer2} from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent {
  hostElement: HTMLElement | undefined;
  lightMode: Boolean = false;
  @Input() Title : String ="9,051 din/kWh";
  @Input() subTitle : String ="";
  @Input() value : String ="9,051 din/kWh";
  
  @Input() @HostBinding("icon") public hasIcon = true;
  @Input() @HostBinding("bg-blue-color") public isBgBlue = false;
  @Input() @HostBinding("bg-purple-color") public isBgPurple = false;
  @Input() @HostBinding("bg-pink-color") public isBgPink = false;
  @Input() @HostBinding("bg-orange-color") public isBgOrange = false;

  
  constructor (private elementRef: ElementRef, private renderer: Renderer2, private userService: UserService) {

  }


  async ngOnInit(): Promise<void> {
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement = this.elementRef.nativeElement as HTMLElement;
      this.lightMode = !dark;

      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
    });
  }
}
