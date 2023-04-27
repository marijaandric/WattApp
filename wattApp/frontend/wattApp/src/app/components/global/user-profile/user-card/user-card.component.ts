import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import { url } from 'src/app/app.module';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  baseUrl = url + "/api/Images/user/";
  userInfo: any;
  display: boolean = false;
  menageUserForm! : FormGroup;
  userImageUrlEndpoint!: string;

  constructor(private router:Router,
    private userService: UserService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService) {}

  ngOnInit() {
    this.getUser();
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
  getUser()
  {
    const token = localStorage.getItem('token');
    
    if(token)
    {
      const userId = this.userService.getUserIdFromToken(token);
      this.userService.GetUser(userId,token).subscribe((data) => {
        this.userInfo = data;
      });
      this.userImageUrlEndpoint = this.baseUrl + userId;
    }
  }

  showDialog() {
    this.display = true;
    this.menageUserForm = this.fb.group({
      id: this.userInfo.id,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      username: this.userInfo.username,
      email: this.userInfo.email,
      phoneNumber: this.userInfo.phoneNumber,
      address: this.userInfo.address,
      password: this.userInfo.password,
      role: this.userInfo.role,
      token: this.userInfo.token,
    });
  }

  edit(){
    const token = localStorage.getItem('token');
    this.menageUserForm.patchValue({
      id : this.userInfo.id
    })
    this.menageUserForm.patchValue({
      password : this.userInfo.password
    })
    this.menageUserForm.patchValue({
      role : this.userInfo.role
    })
    this.menageUserForm.patchValue({
      token: token
    })
    
      if(token){
      this.userService.PutUser(this.userService.getUserIdFromToken(token),this.menageUserForm.value)
      .subscribe(
        {
          next: () => {
            this.display = false;
            this.getUser();
            },
          error: error => {
            alert("Niste lepo azurirali profil");
            // mislim da alert treba da bude konkretniji
          }
        }
      )
    }
  }

  onImageChange(event: any) {
    const randomNumber = Math.floor(Math.random() * 1000);
    this.userImageUrlEndpoint += `?random=${randomNumber}`;
  }
  
  deleteImage() {
    this.fileUploadService.deleteUserImage(this.userInfo.id).subscribe(() => {
      this.onImageChange(null);
    });
  }
  
}