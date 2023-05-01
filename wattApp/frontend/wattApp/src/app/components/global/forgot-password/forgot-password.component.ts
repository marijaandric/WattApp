import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  resetPasswordEmail!: string;
  isValidEmail!: boolean;

  constructor(private authService:AuthService,
    private toast:NgToastService){}

  ngOnInit(): void {
    
  }

  checkValidEmail(event: string)
  {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  public confirmToSend()
  {
    if(this.isValidEmail != undefined && this.isValidEmail == true)
    {
      this.authService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
        next:(res)=>{
          console.log("GRESKA")
          this.resetPasswordEmail = "";
          this.toast.success({
            detail:"Success",
            summary:"Check your mail!",
            duration:3000,
          })
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
