import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit{
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

  ngOnInit(): void {
    
  }

  
}
