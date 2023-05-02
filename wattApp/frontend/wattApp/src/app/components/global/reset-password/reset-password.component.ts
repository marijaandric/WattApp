import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { confirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();
  uriToken: any;

  constructor(private router:Router,private toast:NgToastService,private authService:AuthService,private fb:FormBuilder,private activtedRoute: ActivatedRoute){}

  ngOnInit(): void{
    this.resetPasswordForm = this.fb.group({
      password: [null,Validators.required],
      confirmPassword: [null,Validators.required],
    },{
      validator: confirmPasswordValidator("password","confirmPassword")
    })
    this.activtedRoute.queryParams.subscribe(val=>{
      this.emailToReset= val['email'];
      this.uriToken = val['code'];

      this.emailToken = this.uriToken.replace(/ /g,'+');

    })
  }

  reset()
  {
    if(this.resetPasswordForm.valid)
    {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.emailToken;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;
      console.log(this.resetPasswordObj);
      this.authService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          this.toast.success({
            detail:"Success",
            summary:"Password changed!",
            duration:3000,
          });
          this.router.navigate(['/login']);
        },
        error:(err)=>{
          this.toast.error({
            detail:"Error",
            summary:"Something went wrong!",
            duration:3000,
          })
        }
      })

    }
    
  }



}
