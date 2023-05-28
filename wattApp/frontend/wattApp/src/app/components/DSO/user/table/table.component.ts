import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DeviceDataService } from 'src/app/services/device-data/device-data.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Table } from 'primeng/table';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  lightMode : Boolean = true;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('dtUsers', { static: false }) table!: Table;
  devices: any;
  @Input() id : any;
  isChecked: boolean = true;

  statusFilterOptions: SelectItem[];
  selectedStatusFilter: any;

  activityFilterOptions: SelectItem[];
  selectedActivityFilter: any;

  constructor(private deviceService:DeviceService, private userService: UserService)
  {
    this.statusFilterOptions = [
      { label: 'Consumer', value: 'Consumer' },
      { label: 'Producer', value: 'Producer' },
      { label: 'Stock', value: 'Stock' }
    ];

    this.activityFilterOptions = [
      { label: 'true', value: 'true' },
      { label: 'false', value: 'false' }
    ];
  }


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

  filterStatus(value: any) {
    this.table.filter(value, 'deviceType', 'equals');
  }

  getSeverity(label: string):string {
    if (label === 'Consumer') {
      return 'Consumer';
    } else if (label === 'Producer') {
      return 'Producer';
    } else if (label === 'Stock') {
      return 'Stock';
    } else {
      return 'All';
    }
  }

  filterActivity(value: any) {
    this.table.filter(value, 'isActive', 'equals');
  }

  getSeverityActivity(label: string):string {
    if (label === 'true') {
      return 'true';
    } else {
      return 'false';
    }
  }
}
