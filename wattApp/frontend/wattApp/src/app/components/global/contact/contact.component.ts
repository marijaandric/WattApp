import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(
    private toast: NgToastService,
    ) {
  }

  SendMessage() {
    this.toast.success({detail:"SUCCESS",summary:"You have successfully send message",duration:5000});
     
      setTimeout(() => {
        location.reload();
      }, 1500);

  }

}
