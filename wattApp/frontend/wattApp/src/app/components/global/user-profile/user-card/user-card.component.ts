import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import { url } from 'src/app/app.module';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  hostElement: HTMLElement | undefined;
  lightMode: Boolean = true;
  display3: boolean = false;
  baseUrl = url + "/api/Images/user/";
  userInfo: any;
  display: boolean = false;
  menageUserForm! : FormGroup;
  userImageUrlEndpoint!: string;
  value!:string;
  address!:string;

  constructor(private router:Router,
    private userService: UserService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService, private toast:NgToastService,private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    this.hostElement?.classList.toggle('light-theme-bigger-shadow', true);
    this.hostElement?.classList.add('light-theme-background-white');
    
    const pencnt = this.hostElement.querySelector('.pen-container');
    this.renderer.addClass(pencnt, 'light-theme-text-color-black')
    this.renderer.addClass(pencnt, 'light-theme-background-white')

    const usrTitle = this.hostElement.querySelector('.username-title');
    this.renderer.addClass(usrTitle, 'text-color-blue')
    const texts = this.hostElement.querySelectorAll('h6');
    texts.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'light-theme-text-color-black');
    });

    this.getUser();
     
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
      refreshToken:['string', Validators.required],
      refreshTokenExpiryTime: ['2023-05-04T11:25:23.308Z', Validators.required],
      x:  this.userInfo.x,
      y:  this.userInfo.y,
      area :['', Validators.required],
      resetPasswordToken: ['string', Validators.required],
      resetPasswordExpiryTime: ['2023-05-04T11:25:23.308Z', Validators.required],
      imageId: this.userInfo.imageId
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
    this.menageUserForm.patchValue({
      imageId: this.userInfo.imageId
    })

    console.log(this.menageUserForm.value)
      if(token){
      this.userService.PutUser(this.userService.getUserIdFromToken(token),this.menageUserForm.value)
      .subscribe(
        {
          next: () => {
            this.display = false;
            this.getUser();
            this.toast.success({detail:"SUCCESS",summary:"You have successfully changed your profile",duration:5000});
          setTimeout(() => {
            location.reload();
          }, 1350)
            },
          error: error => {
            this.toast.error({detail:"Error",summary:"Please check all your details",duration:4000});
          }
        }
      )
    }
  }

  onImageChange(event: any) {
    const randomNumber = Math.floor(Math.random() * 1000);
    this.userImageUrlEndpoint += `?random=${randomNumber}`;
    this.display3 = false;
    location.reload();
  }
  
  deleteImage() {
    this.fileUploadService.deleteUserImage(this.userInfo.id).subscribe(() => {
      this.onImageChange(null);
      this.display3 = false;
      location.reload();
    });
  }
  
  showDialog3() {
    this.display3 = true;
  }

  receiveMessage(message : any) {
    this.address = message.address
    if(message.district == null)
    {
      message.district = "Grad Kragujevac"
    }
    this.menageUserForm.patchValue({
      x : message.lat
    })
    this.menageUserForm.patchValue({
      y : message.lon
    })
    this.menageUserForm.patchValue({
      address : this.address
    })
    this.menageUserForm.patchValue({
      area : message.district
    })
  }

  async onAddressChange(event:any){
    this.value = event.target.value;
  }
}