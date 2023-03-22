import { Component, HostListener } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';

interface SwitchOption {
  label: string;
  value: boolean;
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {
  allDevices: DeviceDTO[] = [];
  numVisible: number = 5;
  devicesByRoomType: {[key: string]: DeviceDTO[]} = {};
  switchValue: boolean = true;

  switchOptions: SwitchOption[] = [
    {label: 'Grid', value: true},
    {label: 'Table', value: false}
  ];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getAllDevices().subscribe((result: DeviceDTO[]) => {
      this.allDevices = result;
      this.updateNumVisible(window.innerWidth);
      this.groupDevicesByRoomType();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateNumVisible(window.innerWidth);
  }

  private groupDevicesByRoomType() {
    this.devicesByRoomType = this.allDevices.reduce((acc, device) => {
      if (!acc[device.room]) {
        acc[device.room] = [];
      }
      acc[device.room].push(device);
      return acc;
    }, {} as {[key: string]: DeviceDTO[]});
  }

  private updateNumVisible(windowWidth: number) {
    console.log("resized" + windowWidth);
    if (windowWidth < 576) {
      this.numVisible = 1;
    } else if (windowWidth < 768) {
      this.numVisible = 1;
    } else if (windowWidth < 992) {
      this.numVisible = 2;
    } else if (windowWidth < 1200) {
      this.numVisible = 3;
    } else if (windowWidth < 1600) {
      this.numVisible = 4;
    } else {
      this.numVisible = 5;
    }
  }

  clear(dtAllDevices: any) {
    dtAllDevices.clear();
  }

  onSearch(value: string, dtAllDevices: any) {
    dtAllDevices.filterGlobal(value, 'contains');
  }
}
