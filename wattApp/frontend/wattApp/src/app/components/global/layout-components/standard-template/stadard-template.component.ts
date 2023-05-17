import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'standard-template',
  templateUrl: './stadard-template.component.html',
  styleUrls: ['./stadard-template.component.css']
})
export class StadardTemplateComponent {
  hostElement: HTMLElement | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    console.log(':host selector:', this.hostElement.tagName.toLowerCase());
    const sidebar = this.hostElement?.querySelector('.sidebar');
    this.renderer.addClass(sidebar, 'light-theme-bigger-shadow');
  }

  showSidebar(isShown: boolean): void {
    this.hostElement?.classList.toggle('sidebar-opened', isShown);
  }
}
