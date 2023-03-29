import { Component } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';

@Component({
  selector: 'app-devices-stock',
  templateUrl: './devices-stock.component.html',
  styleUrls: ['./devices-stock.component.css']
})
export class DevicesStockComponent {
  stockDevices: DeviceDTO[] = [];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getDevicesByType("Storage").subscribe((result: DeviceDTO[]) => {
      this.stockDevices = result;
    });
  }
}
