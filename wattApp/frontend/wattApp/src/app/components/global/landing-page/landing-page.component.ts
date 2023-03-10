import { Component, HostListener, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
declare var Parallax: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  
  @ViewChild('parallaxcon') parallaxcon!: ElementRef;
  
  constructor(private renderer: Renderer2)
  {

  }

  ngOnInit(): void {
  }
  

  @HostListener('window:scroll',["$event"])
  onWindowScroll(event:any){
      const textElement = this.parallaxcon.nativeElement.querySelector('h2');
      const btn = this.parallaxcon.nativeElement.querySelector('button');
      const marginTop = window.scrollY/3;
      const marginLeft = -window.scrollY/3;

      console.log(marginLeft);
      
      this.renderer.setStyle(textElement, 'marginTop', `${marginTop}px`);
      this.renderer.setStyle(textElement, 'marginRight', `${marginLeft}px`);
      this.renderer.setStyle(btn, 'marginTop', `${marginTop}px`);
      this.renderer.setStyle(btn, 'marginRight', `${marginLeft}px`);
    
  }


  
}
