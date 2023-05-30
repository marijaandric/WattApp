import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit{
  lightMode: Boolean = true;
  @Input() id : any;
  @Input() type : any;
  result :any;
  

  constructor(private deviceService:DeviceService, private userService: UserService){}

  
  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
     
    });
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const max = 'max';
    this.deviceService.getmonth(this.id,year,month,this.type).subscribe(data =>{
        this.result = data;
        console.log(data)
    })
  }
}
