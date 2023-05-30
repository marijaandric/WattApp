import { Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  hostElement: HTMLElement | undefined;
  userInfo: any;
  id: any;

  subTitle : String ="Get a discount!";
  Title : String ="Show us all your device, get a 10% discount! For more information, contact our operators! Dear consumers, we inform you that the price of electricity will decrease by 5% in the coming period.";

  @Input() @HostBinding("blue-color") public isBlue = false;
  @Input() @HostBinding("bg-blue-color") public isBgBlue = false;
  
  @Input() @HostBinding("yellow-color") public isYellow = false;
  @Input() @HostBinding("bg-yellow-color") public isBgYellow = false;
  
  @Input() @HostBinding("pink-color") public isPink = false;
  @Input() @HostBinding("bg-pink-color") public isBgPink = false;

  constructor(private elementRef: ElementRef,
    private userService:UserService,
    private router:ActivatedRoute,
     private renderer: Renderer2) {
      this.id = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit():void {
    
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const mapShadow = this.hostElement.querySelector('.slika');
    this.renderer.addClass(mapShadow, 'light-theme-bigger-shadow');

  }



  isAdmin(): boolean {
    return this.userInfo?.role === 'admin' ||  this.userInfo?.role === 'superadmin';
  }

  isOperater(): boolean {
    return this.userInfo?.role  === 'operator';
  }
}

