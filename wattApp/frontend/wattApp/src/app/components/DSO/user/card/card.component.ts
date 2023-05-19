import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { url } from 'src/app/app.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  baseUrl = url + "/api/Images/user/";
  @Input() user : any;
  userImageUrlEndpoint!: string;
  display = false;
  menageUserForm!:FormGroup;

  constructor(private userService:UserService,private fb:FormBuilder,private toast:NgToastService,private router:Router){}

  ngOnInit(){
    this.userImageUrlEndpoint = this.baseUrl + this.user.id;
    this.menageUserForm = this.fb.group({
      id: [this.user.id, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      address: [this.user.address, Validators.required],
      password: [this.user.password, Validators.required],
      role: [this.user.role, Validators.required],
      token: ['', Validators.required],
      x :  [this.user.x, Validators.required],
      y :  [this.user.y, Validators.required],
      area :  [this.user.area, Validators.required],
    });
  }

  showDialog()
  {
    this.display = !this.display;
  }

  edit()
  {

  }

  navigateToProsumers(): void {
    this.router.navigateByUrl("users/prosumers");
  }

  deleteUser()
  {
    this.userService.deleteUser(this.user.id).subscribe(data=>{
      this.toast.success({detail:"SUCCESS",summary:"You have successfully delete user" ,duration:3000});
      this.router.navigate(['/users/prosumers'])
    })
  }
  
}
