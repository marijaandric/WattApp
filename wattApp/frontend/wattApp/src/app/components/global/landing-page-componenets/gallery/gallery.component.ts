import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  @HostListener('window:scroll',["$event"])
  onWindowScroll(event:any){
      var cards = document.querySelectorAll('.container');

      for(var i = 0; i < cards.length; i++) {
        var windowHeight = window.innerHeight;
        var revealtop = cards[i].getBoundingClientRect().top;
        var revealpoint = 550;

        if(revealtop < windowHeight - revealpoint){
          cards[i].classList.add('active');
        }
        else {
          cards[i].classList.remove('active');
        }
      }
      
  }
}
