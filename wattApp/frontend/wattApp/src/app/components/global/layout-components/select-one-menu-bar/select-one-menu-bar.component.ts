import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-select-one-menu-bar',
  templateUrl: './select-one-menu-bar.component.html',
  styleUrls: ['./select-one-menu-bar.component.css']
})
export class SelectOneMenuBarComponent implements OnInit{

  hostElement: HTMLElement | undefined;

  constructor (private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit():void {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    this.hostElement?.classList.toggle('light-theme-bigger-shadow', true);
    this.hostElement?.classList.add('light-theme-background-white');

  }

}
