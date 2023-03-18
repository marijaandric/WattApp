import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  userInfo: any;
  display: boolean = false;
  menageUserForm! : FormGroup;

  constructor(private userService: UserService,private fb: FormBuilder) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token)
    {
      const userId = this.userService.getUserIdFromToken(token);
      this.userService.GetUser(userId,token).subscribe((data) => {
        this.userInfo = data;
      });
    }
    
    this.menageUserForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  showDialog() {
    this.display = true;
  }
}