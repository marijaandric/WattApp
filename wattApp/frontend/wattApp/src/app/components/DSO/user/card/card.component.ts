import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  @Input() id : any;
  user : any;

  constructor(private userService:UserService){}

  ngOnInit(){
    this.getUser()
  }

  getUser()
  {
    console.log("USLO")
      this.userService.GetUserWithoutToken(this.id).subscribe(data =>{
        this.user = data;
        console.log(data)
      })
    
  }
  
}
