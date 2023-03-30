import { Component } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';

@Component({
  selector: 'app-devices-consumption',
  templateUrl: './devices-consumption.component.html',
  styleUrls: ['./devices-consumption.component.css']
})
export class DevicesConsumptionComponent {
  consumptionDevices: DeviceDTO[] = [];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getDevicesByType("Consumer").subscribe((result: DeviceDTO[]) => {
      this.consumptionDevices = result;
    });
  }
}
