import { Component, Input, OnInit } from '@angular/core';
import { DeviceDataService } from 'src/app/services/device-data/device-data.service';
import { DeviceService } from 'src/app/services/device/device.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  devices: any;
  @Input() id : any;

  constructor(private deviceService:DeviceService){}

  ngOnInit(): void {
    this.deviceService.getDevicesByUserId(this.id).subscribe(data=>{
      this.devices = data;
      console.log(data)
    })
  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }
}
