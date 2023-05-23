import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent {
  hostElement: HTMLElement | undefined;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  

  ngOnInit(): void {

    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    
    const text = this.hostElement?.querySelectorAll('.tab-title');
    text.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'ligh-theme-text-color-gray');
    });
    const icons = this.hostElement?.querySelectorAll('.tab-icon i');
    icons.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'ligh-theme-text-color-gray');
    });
  }
}
