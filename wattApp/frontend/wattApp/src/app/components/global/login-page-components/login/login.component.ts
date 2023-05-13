import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  eyeIcon:string = "fa fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService, private router:Router,private toast:NgToastService)
  {
    
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass()
  {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa fa-eye":this.eyeIcon = "fa fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid)
    {
     this.auth.login(this.loginForm.value)
     .subscribe({
      next:(res)=>{
        this.loginForm.reset();
        this.auth.storeToken(res.accessToken);
        this.auth.storeRefreshToken(res.refreshToken);
        this.toast.success({detail:"SUCCESS",summary:"You have successfully logged in" ,duration:3000});
        this.router.navigate(['home']);
      },
      error:(err)=>{
        this.toast.error({detail:"ERROR",summary:"Something is wrong, please check your email or password",duration:3000});
      }
     },
     )
    }
    else{
      this.toast.error({detail:"ERROR",summary:"Something is wrong, please check your email or password",duration:3000});
    }
  }

}
