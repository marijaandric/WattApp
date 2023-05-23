import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  hostElement: HTMLElement | undefined;
  lightMode: Boolean = true;

  SendMessage() {
    this.toast.success({detail:"SUCCESS",summary:"You have successfully send message",duration:5000});
     
      setTimeout(() => {
        location.reload();
      }, 1500);

  }

  
  constructor (private elementRef: ElementRef, private renderer: Renderer2, private toast: NgToastService) {

  }


  ngOnInit(): void {
  
  this.hostElement = this.elementRef.nativeElement as HTMLElement;
  const text = this.hostElement?.querySelector('.item_title');
  this.renderer.addClass(text, 'ligh-theme-text-color-gray');
  
  const login_box = this.hostElement?.querySelector('.login_box');
  this.renderer.addClass(login_box, 'light-theme-bigger-shadow');
  console.log(login_box);
  }
}
