import { Component, Input, SimpleChange } from '@angular/core';
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
export class DeviceCardComponent{
  @Input() device: any;
  isChecked: boolean = true;
  display: boolean = false;

  constructor(private deviceService: DeviceService){ }

  async handleRunningSwitchChange(){
    await lastValueFrom(this.deviceService.updateDevice(this.device));
  }

  ngOnChange(changes:SimpleChange)
  {
    this.device = this.device;
  }

  showDialog() {
    this.display = !this.display;
  }

  // ngOnChanges() {
  //   // Update the switch button state when the device.isActive property changes
  //   const switchButton = document.querySelector('#mySwitch');
  //   if (switchButton) {
  //     switchButton['checked'] = this.device.isActive;
  //   }
  // }

  onSwitchChange(newVal: boolean) {
    //this.showDialog();
    const confirmed = confirm('Do you want to change the device activity?');
    if (confirmed) {
      this.device.isActive = newVal;
      this.handleRunningSwitchChange();
    }

    // const confirmed = this.showDialog();
    // if (confirmed) {
    //   this.device.isActive = newVal;
    // }

    
  }


}
