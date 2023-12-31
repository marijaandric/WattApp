import { Component, HostListener, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

declare var Parallax: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  
  images = [
    '/assets/images/landing-page-images/vetrenjace.jpg',
    '/assets/images/landing-page-images/vetrenjace.jpg',
    '/assets/images/landing-page-images/vetrenjace.jpg',
    '/assets/images/landing-page-images/vetrenjace.jpg',
    '/assets/images/landing-page-images/vetrenjace.jpg',
    '/assets/images/landing-page-images/vetrenjace.jpg',
  ];

  carouselItems = [
    {
      imageUrl: '/assets/images/landing-page-images/vetrenjace.jpg',
      caption: 'First Carousel Item',
    },
    {
      imageUrl: '/assets/images/landing-page-images/citilights.jpg',
      caption: 'Second Carousel Item',
    },
    {
      imageUrl: '/assets/images/landing-page-images/vetrenjace.jpg',
      caption: 'Third Carousel Item',
    },
    // add more items here...
  ];

  @ViewChild('parallaxcon') parallaxcon!: ElementRef;
  
  ngOnInit(): void {
      
  }
  constructor(private renderer: Renderer2)
  {

  }

  @HostListener('window:scroll',["$event"])
  onWindowScroll(event:any){
      var cards = document.querySelectorAll('.card');

      for(var i = 0; i < cards.length; i++) {
        var windowHeight = window.innerHeight;
        var revealtop = cards[i].getBoundingClientRect().top;
        var revealpoint = 300;

        if(revealtop < windowHeight - revealpoint){
          cards[i].classList.add('active');
        }
        else {
          cards[i].classList.remove('active');
        }
      }
      
      const textElement = this.parallaxcon.nativeElement.querySelector('h2');
      const textElement2 = this.parallaxcon.nativeElement.querySelector('h3');
      const btn = this.parallaxcon.nativeElement.querySelector('button');
      const marginTop = window.scrollY/3;
      const marginLeft = -window.scrollY/3;


      console.log(marginLeft);
      
      this.renderer.setStyle(textElement, 'marginTop', `${marginTop}px`);
      this.renderer.setStyle(textElement, 'marginRight', `${marginLeft}px`);
      this.renderer.setStyle(textElement2, 'marginTop', `${marginTop}px`);
      this.renderer.setStyle(textElement2, 'marginRight', `${marginLeft}px`);
      this.renderer.setStyle(btn, 'marginTop', `${marginTop}px`);
      this.renderer.setStyle(btn, 'marginRight', `${marginLeft}px`);
  }  
  
}
