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

  ngOnInit(): void {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const cards = this.hostElement?.querySelectorAll('.klasa .cont .card');
    cards.forEach((card) => {
      this.renderer.addClass(card,'light-theme-background-white');
      this.renderer.addClass(card,'light-theme-bigger-shadow');
    });
    const pEl = this.hostElement?.querySelectorAll('h5, p, h4');
    pEl.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'ligh-theme-text-color-gray');
    });
    const info = this.hostElement?.querySelector('.info');
    this.renderer.addClass(info,'light-theme-background-white');
    this.renderer.addClass(info,'light-theme-bigger-shadow');
    const image = this.hostElement?.querySelector('.image');
    this.renderer.addClass(image,'light-theme-background-white');
    this.renderer.addClass(image,'light-theme-bigger-shadow');
  }
}
