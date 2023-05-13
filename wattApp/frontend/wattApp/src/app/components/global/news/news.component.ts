import { Component, Input, OnInit } from '@angular/core';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';
import { CarouselModule } from 'primeng/carousel';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';


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

  switchOptions: SwitchOption[] = [
    {label: 'All news', value: true},
    {label: 'My news', value: false}
  ];
 
 

  constructor(private dsonew : DsonewsService,
    private authService: AuthService,
    private userService: UserService,
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

  ngOnInit(): void {
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
