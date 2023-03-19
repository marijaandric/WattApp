import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router:Router,private userService: UserService,private fb: FormBuilder) {}

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
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      Address: ['', Validators.required]
    });
  }

  showDialog() {
    this.display = true;
  }

  edit(){
    const token = localStorage.getItem('token');
    console.log(this.menageUserForm.value);
      if(token){
      this.userService.PutUser(this.userService.getUserIdFromToken(token),this.menageUserForm.value)
      .subscribe(
        {
          next: () => {
            },
          error: error => {
            console.log(error);
          }
        }
      )
    }
  }
}