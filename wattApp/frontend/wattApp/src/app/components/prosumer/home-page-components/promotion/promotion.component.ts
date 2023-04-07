import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit{
  @Input() subTitle : String ="Get a discount!";
  @Input() Title : String ="Show us all your device, get a 10% discount! For more information, contact our operators! Dear consumers, we inform you that the price of electricity will decrease by 5% in the coming period.";
  @Input() Datum : String ="01.01.2023.";
  @Input() Status : String ="Nista";


  @Input() @HostBinding("blue-color") public isBlue = false;
  @Input() @HostBinding("bg-blue-color") public isBgBlue = false;
  
  @Input() @HostBinding("yellow-color") public isYellow = false;
  @Input() @HostBinding("bg-yellow-color") public isBgYellow = false;
  
  @Input() @HostBinding("pink-color") public isPink = false;
  @Input() @HostBinding("bg-pink-color") public isBgPink = false;


  ngOnInit(): void {
    console.log(this.isBlue);
    console.log(this.isBgBlue);
  }

}
