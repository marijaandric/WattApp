import { Component, Input, OnInit } from '@angular/core';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';
import { CarouselModule } from 'primeng/carousel';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit{

  news: any[] = [];
  newsImportant: any[] = [];
  newsRegular: any[] = [];

  constructor(private dsonew : DsonewsService) {
  }

  getNews() {
    this.dsonew.getnew().subscribe((data: any) => {
      this.news = data;

     
      data.forEach((element:any) => {
        this.newsRegular.push(element)
      });
      this.newsRegular.sort((a, b) => b.id - a.id);

      data.forEach((element:any) => {
        this.newsImportant.push(element)
      });
      this.newsImportant.sort((a, b) => b.id - a.id);

      //console.log(data);

      console.log(this.news);
      console.log(this.newsImportant);
      console.log(this.newsRegular);
      this.newsRegular.forEach((element,index)=>{
        if(element.priority=== "Important") this.newsRegular.splice(index,1);
      });
      this.newsImportant.forEach((element,index)=>{
        if(element.priority=== "Regular") this.newsImportant.splice(index,1);
      });

      console.log(this.news);
      console.log(this.newsImportant);
      console.log(this.newsRegular);
    });
  
  }

  ngOnInit(): void {
    this.getNews();
    
  }

}
