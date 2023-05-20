import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  hostElement: HTMLElement | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnIt() {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
   
    const cards = this.hostElement?.querySelectorAll('.klasa .cont .card');
    cards.forEach((card) => {
      this.renderer.addClass(card,'light-theme-background-white');
      this.renderer.addClass(card,'light-theme-bigger-shadow');
      console.log(card);
    });
    
  }
}
