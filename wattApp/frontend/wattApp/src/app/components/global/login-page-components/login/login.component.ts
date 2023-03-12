import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  eyeIcon:string = "fa fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService, private router:Router)
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
      console.log(this.loginForm.value)
     this.auth.login(this.loginForm.value)
     .subscribe({
      next:(res)=>{
        alert(res.message);
        this.loginForm.reset();
        this.router.navigate(['home']);
      },
      error:(err)=>{
        alert(err?.error.message);
      }
     },
     )
    }
    else{
      alert ("Your form is invalid");
    }
  }

}
