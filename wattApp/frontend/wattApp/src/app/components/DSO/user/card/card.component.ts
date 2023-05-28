import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { url } from 'src/app/app.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  hostElement: HTMLElement | undefined;
  lightMode: Boolean = true;
  baseUrl = url + "/api/Images/user/";
  @Input() user : any;
  userImageUrlEndpoint!: string;
  display = false;
  menageUserForm!:FormGroup;
  id: any;

  constructor(private routers:ActivatedRoute,private userService:UserService,private fb:FormBuilder,private toast:NgToastService,private router:Router,private elementRef: ElementRef, private renderer: Renderer2){
    this.id = this.routers.snapshot.paramMap.get('id');
    this.userImageUrlEndpoint = this.baseUrl + this.id;
  }

  async ngOnInit(): Promise<void> {
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;

      
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
    });
    
  }

  showDialog()
  {
    this.display = !this.display;
  }
  



  navigateToProsumers(): void {
    this.router.navigateByUrl("users/prosumers");
  }

  deleteUser()
  {
    this.userService.deleteUser(this.user.id).subscribe(data=>{
      this.toast.success({detail:"SUCCESS",summary:"You have successfully delete user" ,duration:3000});
      this.router.navigate(['/users/prosumers'])
    })

  }
  
}
