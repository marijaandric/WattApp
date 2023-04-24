import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { url } from 'src/app/app.module';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  baseUrl = url + "/api/Images/user/";
  @Input() user : any;
  userImageUrlEndpoint!: string;

  constructor(private userService:UserService){}

  ngOnInit(){
    this.userImageUrlEndpoint = this.baseUrl + this.user.userId;
  }

  setDefaultImage() {
    this.userImageUrlEndpoint = '/assets/images/application-images/empty-image.png';
  }
  
}
