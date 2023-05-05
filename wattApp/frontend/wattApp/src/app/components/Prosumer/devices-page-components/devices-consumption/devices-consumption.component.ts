import { Component } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-devices-consumption',
  templateUrl: './devices-consumption.component.html',
  styleUrls: ['./devices-consumption.component.css']
})
export class DevicesConsumptionComponent {
  consumptionDevices: DeviceDTO[] = [];
  loader = true;

  constructor(private deviceService: DeviceService,
    private userService: UserService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    
    if(token)
    {
      const userId = this.userService.getUserIdFromToken(token);
      this.deviceService.getDevicesForUserByType(userId, "Consumer").subscribe((result: DeviceDTO[]) => {
        this.loader = false;
        this.consumptionDevices = result;
      });
    }
  }

}
