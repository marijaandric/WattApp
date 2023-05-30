import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';
import { UserService } from 'src/app/services/user/user.service';
//import { UserService } from 'src/app/services/user.service';


import { url } from 'src/app/app.module';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.css']
})
export class AdminCardComponent {
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
  id : any;

  constructor(private router:ActivatedRoute,
    private fb:FormBuilder,
    private userService:UserService,
    private routers:Router,
    private fileUploadService: FileUploadService, private toast:NgToastService,private elementRef: ElementRef, private renderer: Renderer2) {
      this.id = this.router.snapshot.paramMap.get('id');

    }

    

  
  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement = this.elementRef.nativeElement as HTMLElement;
      this.lightMode = dark
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
      
    });

    this.getUser();
     
  }

  getUser()
  {
    const token = localStorage.getItem('token');
    
    if(token)
    {
      const userId = this.userService.getUserIdFromToken(token);
      this.userService.GetUser(this.id,token).subscribe((data) => {
        this.userInfo = data;
      });
      
      this.userImageUrlEndpoint = this.baseUrl + this.id;
    }
  }

  showDialog()
  {
    this.display = !this.display;
    console.log("Usao sam sad!");

  }

  deleteUser()
  {
    console.log("Usao sam sad!");
    this.userService.deleteUser(this.id).subscribe(data=>{
      this.toast.success({detail:"SUCCESS",summary:"You have successfully delete user" ,duration:3000});
      this.routers.navigate(['/users']);
    })
  }

  async onAddressChange(event:any){
    this.value = event.target.value;
  }
}