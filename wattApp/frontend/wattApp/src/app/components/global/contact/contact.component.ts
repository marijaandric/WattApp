import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user/user.service';

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

  
  constructor (private elementRef: ElementRef, private renderer: Renderer2, private toast: NgToastService, private userService: UserService) {

  }


  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
     
    });
  }
}
