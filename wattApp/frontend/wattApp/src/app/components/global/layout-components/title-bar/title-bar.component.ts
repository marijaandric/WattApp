import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  signUpForm! : FormGroup;
  roles : Roles[];
  roleSelected : string;
  
  constructor(private router:Router,private fb: FormBuilder,private authService: AuthService) {
    this.roles = [
      {role:'prosumer'},
      {role:'operator'},
      {role:'admin'},
      {role:'superadmin'},
  ];
  this.roleSelected = 'prosumer';
  }

  ngOnInit(): void {
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
  }
  showDialog(){
    this.display = true;
  }

  onRoleChange(event:any){
    this.roleSelected = event.value.role;
  }

  onSignUp()
  {
    this.signUpForm.patchValue({
      role : this.roleSelected
    })
    console.log(this.signUpForm.value)
    if(this.signUpForm.valid)
    {
      this.authService.signUp(this.signUpForm.value).subscribe({
        next:(res => {
          alert(res.message)
          this.signUpForm.reset()
          this.display = false;
        }),
        error:(err => {
          alert(err?.error.message)
        })
        
      })
      console.log(this.signUpForm);
    }
    else{
      console.log(this.signUpForm.value)
      this.validateAllFormFields(this.signUpForm)
    }
  }

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
}
