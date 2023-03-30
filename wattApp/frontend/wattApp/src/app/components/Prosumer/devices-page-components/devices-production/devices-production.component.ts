import { Component } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';

@Component({
  selector: 'app-devices-production',
  templateUrl: './devices-production.component.html',
  styleUrls: ['./devices-production.component.css']
})
export class DevicesProductionComponent {
  productionDevices: DeviceDTO[] = [];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getDevicesByType("Producer").subscribe((result: DeviceDTO[]) => {
      this.productionDevices = result;
    });
  }
}
