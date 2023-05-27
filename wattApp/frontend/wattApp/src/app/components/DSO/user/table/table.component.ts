import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DeviceDataService } from 'src/app/services/device-data/device-data.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  lightMode : Boolean = true;
  @ViewChild('searchInput') searchInput!: ElementRef;
  devices: any;
  @Input() id : any;
  isChecked: boolean = true;

  constructor(private deviceService:DeviceService, private userService: UserService){}


  async ngOnInit(): Promise<void> {
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
    });
    this.deviceService.GetUserDevicesVisibleForDSO(this.id).subscribe(data=>{
      this.devices = data;
      console.log(data)
    })
  }

  clear(dtUsers: any) {
    this.searchInput.nativeElement.value = '';
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }

  async handleRunningSwitchChange(device : any){
    await lastValueFrom(this.deviceService.updateUserDSODevice(device,this.id));
  }
}
