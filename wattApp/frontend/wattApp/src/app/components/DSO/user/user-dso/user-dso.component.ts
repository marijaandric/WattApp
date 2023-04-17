import { Component, Input, OnInit } from '@angular/core';
import { StadardTemplateComponent } from 'src/app/components/global/layout-components/standard-template/stadard-template.component';
import { HttpClient } from '@angular/common/http';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';

import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { UserService } from 'src/app/services/user/user.service';
import { UserDTO } from 'src/app/dtos/UserDTO';
@Component({
  selector: 'app-user-dso',
  templateUrl: './user-dso.component.html',
  styleUrls: ['./user-dso.component.css']
})
export class UserDSOComponent implements OnInit{
  id : any;
  Consumer:string='Consumer';
  Producer:string='Producer';
  Stock:string='Stock';
  user:any;

  responsiveOptions: any = null;

  constructor(private route: ActivatedRoute,private dsonew : DsonewsService,private userService:UserService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  news: any[] = [];
  
  naslov1 : any;
  naslov2 : any;
  naslov3 : any;

  sadrzaj1 : any;
  sadrzaj2 : any;
  sadrzaj3 : any;

  datum1 : any;
  datum2 : any;
  datum3 : any;

  status1 : any;
  status2 : any;
  status3 : any;

  getNews() {
  
    this.dsonew.getnew().subscribe((data: any) => {
      this.news = data;
      this.news.sort((a, b) => b.id - a.id);
      //console.log(data);


     this.naslov1 = this.news[0].title;
     this.naslov2 = this.news[1].title;
     this.naslov3 = this.news[2].title;

     this.sadrzaj1 = this.news[0].content;
     this.sadrzaj2 = this.news[1].content;
     this.sadrzaj3 = this.news[2].content;

     this.datum1 = new Date(this.news[0].created).toLocaleDateString();
     this.datum2 = new Date(this.news[1].created).toLocaleDateString();
     this.datum3 = new Date(this.news[2].created).toLocaleDateString();

     this.status1 = this.news[0].priority;
     this.status2 = this.news[1].priority;
     this.status3 = this.news[2].priority;

     console.log(this.news);
    });
  
  }


  ngOnInit(): void {
    this.getNews();
    
  }

  getUser()
  {
    console.log("USLO")
      this.userService.GetUserWithoutToken(this.id).subscribe(data =>{
        this.user = data;
        console.log(data)
      })
    
  }
}
