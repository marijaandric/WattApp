import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  hostElement: HTMLElement | undefined;
  lightMode: Boolean = true;
  contactForm! : FormGroup;
  isValidEmail: boolean = true;

  checkValidEmail(event: string)
  {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  SendMessage() {
    if(this.isValidEmail != undefined && this.isValidEmail == true)
    {
    console.log(this.contactForm.value)
        this.authService.contactUs(this.contactForm.value).subscribe({
          next:(res)=>{
            this.toast.success({detail:"SUCCESS",summary:"You have successfully send message",duration:5000});
        setTimeout(() => {
       location.reload();
     }, 1350)
          },
          error:(err)=>{
            this.toast.error({
              detail:"Error",
              summary:"Please complete all fields",
              duration:3000,
            })
          }
        }) 
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:"Please enter a valid email format.",duration:4000});
      }
  }

  
  constructor(
    private toast: NgToastService,
    private userService: UserService, 
    private elementRef: ElementRef,
     private renderer: Renderer2,
     private fb: FormBuilder,
     private authService:AuthService,
    ) {
      this.contactForm = this.fb.group({
        name:['', Validators.required],
        email: ['', Validators.required],
        subject: ['', Validators.required],
        message:['', Validators.required]
      })
  }


  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
     
    });
  }
}
