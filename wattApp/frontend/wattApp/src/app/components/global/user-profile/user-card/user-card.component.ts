import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  userInfo: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token)
    {
      console.log(token);
      const userId = this.userService.getUserIdFromToken(token);
      console.log(userId);
      this.userService.GetUser(userId,token).subscribe((data) => {
        this.userInfo = data;
        console.log(this.userInfo.firstName);
      });
    }
    
  }
}