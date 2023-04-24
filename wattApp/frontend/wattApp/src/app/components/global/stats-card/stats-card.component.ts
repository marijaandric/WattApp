import { Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent {
  @Input() Title : String ="9,051 din/kWh";
  
  @Input() @HostBinding("bg-blue-color") public isBgBlue = false;
  @Input() @HostBinding("bg-purple-color") public isBgPurple = false;
  @Input() @HostBinding("bg-pink-color") public isBgPink = false;
  @Input() @HostBinding("bg-orange-color") public isBgOrange = false;
}
