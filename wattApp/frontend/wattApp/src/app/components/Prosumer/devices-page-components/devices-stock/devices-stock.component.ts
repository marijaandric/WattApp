import { Component } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-devices-stock',
  templateUrl: './devices-stock.component.html',
  styleUrls: ['./devices-stock.component.css']
})
export class DevicesStockComponent {
  stockDevices: DeviceDTO[] = [];
  loader = true;
  lightMode: Boolean = true;

  constructor(private deviceService: DeviceService,
    private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
      
    });   
    if(token)
    {
      const userId = this.userService.getUserIdFromToken(token);
      this.deviceService.getDevicesForUserByType(userId, "Stock").subscribe((result: DeviceDTO[]) => {
        this.loader = false;
        this.stockDevices = result;
      });
    }
  }

}
