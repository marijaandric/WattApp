import { Component, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceDataDTO } from 'src/app/dtos/DeviceDataDTO';
import { DeviceDataService } from 'src/app/services/device-data/device-data.service';
import { DeviceService } from 'src/app/services/device/device.service';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent {
  @Input() device: any;
  isChecked: boolean = true;
  display: boolean = false;

  constructor(private deviceService: DeviceService){ }

  async handleRunningSwitchChange(){
    await lastValueFrom(this.deviceService.updateDevice(this.device));
  }

  showDialog() {
    this.display = !this.display;
  }

}
