import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'standard-template',
  templateUrl: './stadard-template.component.html',
  styleUrls: ['./stadard-template.component.css']
})
export class StadardTemplateComponent {
  hostElement: HTMLElement | undefined;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    console.log(':host selector:', this.hostElement.tagName.toLowerCase());
  }

  showSidebar(isShown: boolean): void {
    this.hostElement?.classList.toggle('sidebar-opened', isShown);
  }
}
