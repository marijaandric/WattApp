import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { url } from 'src/app/app.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  baseUrl = url + "/api/Images/user/";
  @Input() user : any;
  userImageUrlEndpoint!: string;
  display = false;
  menageUserForm!:FormGroup;

  constructor(private userService:UserService,private fb:FormBuilder){}

  ngOnInit(){
    this.userImageUrlEndpoint = this.baseUrl + this.user.id;
    this.menageUserForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      token: ['', Validators.required]
    });
  }
  
}
