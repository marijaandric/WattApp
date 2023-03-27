import { Component, Input } from '@angular/core';
import { DeviceDataDTO } from 'src/app/dtos/DeviceDataDTO';
import { DeviceDataService } from 'src/app/services/device-data/device-data.service';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent {
  @Input() device: any;
  deviceData: DeviceDataDTO | undefined;
  isChecked: boolean = true;

  constructor(private deviceDataService: DeviceDataService){ }

  ngOnInit() {
    this.getDeviceData(this.device.id); 
  }

  getDeviceData(deviceId: number) {
    this.deviceDataService.getDeviceData(deviceId).subscribe(data => {
      this.deviceData = data;
    });
  }
}
