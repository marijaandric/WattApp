import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  eyeIcon:string = "fa fa-eye-slash";
  ngOnInit(): void {
    
  }

  hideShowPass()
  {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa fa-eye":this.eyeIcon = "fa fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
