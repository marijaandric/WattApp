import { Component, OnInit } from '@angular/core';
import { StadardTemplateComponent } from 'src/app/components/global/layout-components/standard-template/stadard-template.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prosumerhome',
  templateUrl: './prosumerhome.component.html',
  styleUrls: ['./prosumerhome.component.css']
})
export class ProsumerhomeComponent implements OnInit{
  user:any;
  token = localStorage.getItem('token');

  constructor(private userService:UserService,private http: HttpClient)
  {
    if(this.token)
    {
      userService.GetUser(userService.getUserIdFromToken(this.token),this.token).subscribe((data) => {
        this.user = data;
      });
    }
    
  }
  IdBiggestConsumer: any;
  NameBiggestConsumer: any;
  PowerUsageBiggestConsumer : any;

  


  getBiggestConsumer() {
    const deviceId = 1 ;
   // const deviceId = this.user.id ;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Consumer';
    const max = 'max';

    const url = `https://localhost:7158/api/Devices/${deviceId}/${year}/${month}/${day}/${consumer}/${max}`;

    this.http.get(url).subscribe((response: any) => {
       this.IdBiggestConsumer=response.deviceId;
       this.NameBiggestConsumer=response.deviceName;
       this.PowerUsageBiggestConsumer=response.averagePowerUsage.toFixed(3);
     console.log(response);
    });
  
  }

  ngOnInit(): void {
    this.getBiggestConsumer();
  }
  

}
