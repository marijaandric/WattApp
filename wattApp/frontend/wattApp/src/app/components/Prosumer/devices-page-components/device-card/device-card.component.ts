import { Component, Input, OnInit, SimpleChange } from '@angular/core';
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
export class DeviceCardComponent implements OnInit{
  @Input() device: any;
  isChecked: boolean = true;
  display: boolean = false;

  constructor(private deviceService: DeviceService){ }

  ngOnInit(): void {
    this.isChecked = this.device.isActive
  }

  async handleRunningSwitchChange(){
    this.isChecked = !this.isChecked // za alert izbrisati ovo
    this.device.isActive = this.isChecked 
    await lastValueFrom(this.deviceService.updateDevice(this.device));
    this.display = false; // za alert izbrisati ovo
  }

  ngOnChange(changes:SimpleChange)
  {
    this.device = this.device;
    this.isChecked = this.device.isActive
  }

  showDialog() {
    this.isChecked = !this.isChecked
    this.display = !this.display;
  }

  // ngOnChanges() {
  //   // Update the switch button state when the device.isActive property changes
  //   const switchButton = document.querySelector('#mySwitch');
  //   if (switchButton) {
  //     switchButton['checked'] = this.device.isActive;
  //   }
  // }

  // onSwitchChange(newVal: boolean) {
  //   //this.showDialog();
  //   const confirmed = confirm('Do you want to change the device activity?');
  //   if (confirmed) {
  //     this.device.isActive = newVal;
  //     this.handleRunningSwitchChange();
  //   }

  //   // const confirmed = this.showDialog();
  //   // if (confirmed) {
  //   //   this.device.isActive = newVal;
  //   // }

    
  // }

  onSwitchChange() {
    //this.showDialog();
     const confirmed = confirm('Do you want to change the device activity?');
    if (confirmed) {
      this.handleRunningSwitchChange();
    }
    else{
    this.isChecked = !this.isChecked
    }
    
  }


}
