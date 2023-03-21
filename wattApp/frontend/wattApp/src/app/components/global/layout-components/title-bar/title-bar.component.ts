import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit{
  display : boolean = false;
  menageUserForm! : FormGroup;
  
  constructor(private router:Router,private fb: FormBuilder) {}

  ngOnInit(): void {
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
  showDialog(){
    this.display = true;
  }
}
