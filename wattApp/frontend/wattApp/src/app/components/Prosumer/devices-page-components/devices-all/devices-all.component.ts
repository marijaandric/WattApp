import { Component } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';

@Component({
  selector: 'app-devices-all',
  templateUrl: './devices-all.component.html',
  styleUrls: ['./devices-all.component.css']
})
export class DevicesAllComponent {
  allDevices: DeviceDTO[] = [];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getAllDevices().subscribe((result: DeviceDTO[]) => {
      this.allDevices = result;
    });
  }
}
