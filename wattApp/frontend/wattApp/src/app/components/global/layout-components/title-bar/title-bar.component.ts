import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

interface Roles{
  role:string;
}

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit{
  display : boolean = false;
  display2 : boolean = false;
  signUpForm! : FormGroup;
  addDeviceForm! : FormGroup;
  roles : Roles[];
  roleSelected : string;
  showText = false;
  rola:any;
  
  constructor(private router:Router,private fb: FormBuilder,private authService: AuthService,private toast:NgToastService,private userService:UserService) {
    this.roles = [
      {role:'prosumer'},
      {role:'operator'},
      {role:'admin'},
      {role:'superadmin'},
  ];
  this.roleSelected = 'prosumer';
  }

  ngOnInit(): void {
    this.isAdmin();
    if(this.rola == "operator")
    {
      this.roles = [
        {role:'prosumer'}
    ];
    }
    else if(this.rola == "admin")
    {
      this.roles = [
        {role:'prosumer'},
        {role:'operator'}
    ];
    }
    else
    {
      this.roles = [
        {role:'prosumer'},
        {role:'operator'},
        {role:'admin'},
        {role:'superadmin'},
    ];
    }


    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.addDeviceForm = this.fb.group({
      deviceName: ['', Validators.required],
      deviceModel: ['', Validators.required],
      room: ['', Validators.required],
      deviceType: ['', Validators.required],
    })
  }

  // prikaz dijaloga
  showDialog(){
    this.display = true;
  }

  showDialog2(){
    this.display2 = true;
  }

  onRoleChange(event:any){
    this.roleSelected = event.value.role;
  }

  //registracija
  onSignUp()
  {
    this.signUpForm.patchValue({
      role : this.roleSelected
    })
    if(this.signUpForm.valid)
    {
      this.authService.signUp(this.signUpForm.value).subscribe({
        next:(res => {
          this.signUpForm.reset()
          this.toast.success({detail:"SUCCESS",summary:"You have successfully registered",duration:4000});
          this.display = false;
        }),
        error:(err => {
          this.toast.error({detail:"ERROR",summary:"Error",duration:4000});
        })
        
      })
    }
    else{
      this.toast.error({detail:"ERROR",summary:"Error",duration:4000});
      this.validateAllFormFields(this.signUpForm)
    }
  }

  //validacija
  private validateAllFormFields(formGroup : FormGroup)
  {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }






  // da li je neko admin 
  isAdmin()
  {
    const token = this.authService.getToken();
    if(token)
    {
      if(this.userService.getUserRoleFromToken(token))
      {
        this.rola = this.userService.getUserRoleFromToken(token);
        if(this.rola == "prosumer")
        {
          return false;
        }
        else{
          return true;
        }
      }
    }
    return false;
    
  }
}
