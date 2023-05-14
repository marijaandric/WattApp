import { Component, OnInit, HostBinding, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit,OnChanges{
  @Input() subTitle : String ="Get a discount!";
  @Input() Title : String ="Show us all your device, get a 10% discount! For more information, contact our operators! Dear consumers, we inform you that the price of electricity will decrease by 5% in the coming period.";
  @Input() Datum : String ="01.01.2023.";
  @Input() Status : String ="Nista";
  @Input() ID : number =0;
  @Input() authorId: any;
  @Output() public valueEmitter = new EventEmitter<string>();

  permission : boolean = false;
  id:number = 0;

  display2 : Boolean = false;

  display: boolean = false;
  updataNewsForm! : FormGroup;

  showDialog2(){
    //this.valueEmitter.emit("promena");
    this.display2 =!this.display2;
  }

  
  @Input() @HostBinding("blue-color") public isBlue = false;
  @Input() @HostBinding("bg-blue-color") public isBgBlue = false;
  
  @Input() @HostBinding("yellow-color") public isYellow = false;
  @Input() @HostBinding("bg-yellow-color") public isBgYellow = false;
  
  @Input() @HostBinding("pink-color") public isPink = false;
  @Input() @HostBinding("bg-pink-color") public isBgPink = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private dsonewsService: DsonewsService,
    private toast: NgToastService
    ) {
  }

  

  showDialog() {
    this.valueEmitter.emit("promena");
    // this.display = true;
    // this.updataNewsForm = this.fb.group({
    //   title: this.subTitle,
    //   content: this.Title,
    //   priority: [this.Status, Validators.required],
    // }); 
  }

  UpdateNews()
  {
    
    this.updataNewsForm.patchValue({
      authorId : this.id,
      created: new Date()
    });

    console.log(this.updataNewsForm.value);
    // this.dsonewsService.DeleteNews(this.updataNewsForm.value).subscribe({
    //   next:(res => {
    //     this.updataNewsForm.reset()
    //     this.toast.success({detail:"SUCCESS",summary:"You have successfully update news",duration:4000});
    //     this.display = false;
    //     location.reload();
    //   }),
    //   error:(err => {
    //     this.toast.error({detail:"ERROR",summary:"Error",duration:4000});
    //   })
    // }) 
  }


  ngOnChanges(changes: SimpleChanges): void {
    //console.log("USLO")
    this.subTitle = this.subTitle;
    this.Title = this.Title;
    this.Datum = this.Datum;
    this.Status = this.Status;
    this.ID = this.ID

    const token = localStorage.getItem('token')
    if(token)
    {
      const id = this.userService.getUserIdFromToken(token)
      if(this.authorId == id || this.isAdmin() )
      {
        this.permission = true;
      }
      else{
        this.permission = false;
      }
    }
    

    
  }

  isAdmin(): boolean {
    const token = this.authService.getToken();
    if (!token) {
      return false;
    }
    const userRole = this.userService.getUserRoleFromToken(token);
    return userRole === 'admin';
  }

  isOperater(): boolean {
    const token = this.authService.getToken();
    if (!token) {
      return false;
    }
    const userRole = this.userService.getUserRoleFromToken(token);
    return userRole === 'operator';
  }

  DeleteNews(newsId: number) {
    this.dsonewsService.deleteNews(newsId).subscribe(() => {
      this.toast.success({detail:"SUCCESS",summary:"You have successfully DELETE news",duration:5000});
      setTimeout(() => {
        location.reload();
      }, 1500);

    },
    error => console.error(error)
    );
  }

  ngOnInit(): void {
    console.log(this.isBlue);
    console.log(this.isBgBlue);

      this.updataNewsForm = this.fb.group({
        title: ['th', Validators.required],
        authorId :[this.id, Validators.required],
        content: ['', Validators.required],
        priority: ['Regular', Validators.required],
        created: [new Date(), Validators.required],
      })

      const token = localStorage.getItem('token');
    if(token)
    {
      this.id = this.userService.getUserIdFromToken(token)
    }
    }
  

}
