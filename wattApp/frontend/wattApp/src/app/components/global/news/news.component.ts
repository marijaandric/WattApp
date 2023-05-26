import { Component, Input, OnInit } from '@angular/core';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { NgToastService } from 'ng-angular-popup';


interface SwitchOption {
  label: string;
  value: boolean;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit{
  lightMode : Boolean = true;
  loader = true;
  news: any[] = [];
  newsImportant: any[] = [];
  newsRegular: any[] = [];

  MynewsImportant: any[] = [];
  MynewsRegular: any[] = [];
  token = localStorage.getItem('token');
  id : any;

  responsiveOptions: any[] = [];
  switchValue: boolean = true;
  display2 : Boolean = false;

  display: boolean = false;
  updataNewsForm! : FormGroup;



  public handleValue(value: any): void {
    this.display = !this.display;
    this.updataNewsForm = this.fb.group({
      id: [value.id],
      title: [value.title, Validators.required],
      authorId :[value.authorId, Validators.required],
      content: [value.content, Validators.required],
      description:[value.description, Validators.required],
      priority: [value.priority, Validators.required],
      created: [new Date(), Validators.required],
    })
    this.updataNewsForm.patchValue({
      authorId : this.id,
      created: new Date()
    });
  }

  TrenutniId: any;
  public handleValue2(value: any): void {
    this.display2=!this.display2;
    this.TrenutniId=value.id;
 
  }

  showDialog2(){
    this.display2 = !this.display2;
  }

  DeleteNews(newsId: any) {
    console.log("Usao sam");
    this.dsonewsService.deleteNews(newsId).subscribe(() => {
      this.toast.success({detail:"SUCCESS",summary:"You have successfully DELETE news",duration:5000});
      setTimeout(() => {
        location.reload();
      }, 1500);

    },
    error => console.error( this.toast.success({detail:"Error",summary:"You can't delete",duration:5000}))
    );
  }

 
  UpdateNews()
  {
    
    this.updataNewsForm.patchValue({
      authorId : this.id,
      created: new Date()
    });

    console.log(this.updataNewsForm.value);
    this.dsonewsService.UpdateNews(this.updataNewsForm.value.id,this.updataNewsForm.value).subscribe({
      next:(res => {
        this.updataNewsForm.reset()
        this.toast.success({detail:"SUCCESS",summary:"You have successfully update news",duration:4000});
        this.display = false;
        setTimeout(() => {
          location.reload();
        }, 1500);
      }),
      error:(err => {
        this.toast.error({detail:"ERROR",summary:"Error",duration:4000});
      })
    }) 
  }


  switchOptions: SwitchOption[] = [
    {label: 'All news', value: true},
    {label: 'My news', value: false}
  ];
 
 

  constructor(private dsonew : DsonewsService,
    private authService: AuthService,
    private userService: UserService,private fb:FormBuilder,
    private dsonewsService: DsonewsService,
    private toast: NgToastService,
    ) {

  if(this.token)
    {
      this.id = this.userService.getUserIdFromToken(this.token);
    }
  }
  

  datum : any;
  getNews() {
    this.dsonew.getnew().subscribe((data: any) => {
      this.news = data;

      data.forEach((element:any) => {
        if(element.priority=== "Regular")
        {
          const createdDate = new Date(element.created); // kreiramo novi Date objekt iz element.created
          const formattedDate = createdDate.toLocaleDateString();
          element.created = formattedDate;
          this.newsRegular.push(element);
        }
      });
      this.newsRegular.sort((a, b) => b.id - a.id);

      data.forEach((element:any) => {
        if((element.authorId==this.id) && (element.priority=== "Regular"))
        {
          const createdDate = new Date(element.created); // kreiramo novi Date objekt iz element.created
          const formattedDate = createdDate.toLocaleDateString();
          element.created = formattedDate;
          this.MynewsRegular.push(element);
        }
      });
      this.MynewsRegular.sort((a, b) => b.id - a.id);

      data.forEach((element:any) => {
        if(element.priority=== "Important")
        {
          const createdDate = new Date(element.created); // kreiramo novi Date objekt iz element.created
          const formattedDate = createdDate.toLocaleDateString();
          element.created = formattedDate;
          this.newsImportant.push(element)
        }

      });
      this.newsImportant.sort((a, b) => b.id - a.id);

      data.forEach((element:any) => {
        if((element.authorId==this.id) && (element.priority=== "Important"))
        {
          const createdDate = new Date(element.created); // kreiramo novi Date objekt iz element.created
          const formattedDate = createdDate.toLocaleDateString();
          element.created = formattedDate;
          this.MynewsImportant.push(element)
        }

      });
      this.MynewsImportant.sort((a, b) => b.id - a.id);

      console.log(this.news);
      console.log(this.MynewsRegular);
      console.log(this.MynewsImportant);
      this.loader = false;
     // console.log(this.id);

    });
  
  }

   async ngOnInit(): Promise<void> {
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
    });
    
    this.getNews();
    
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '900px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  isAdmin(): boolean {
    const token = this.authService.getToken();
    if (!token) {
      return false;
    }
    const userRole = this.userService.getUserRoleFromToken(token);
    return userRole === 'operator' || userRole === 'admin' || userRole === 'superadmin';
  }

}
