import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent {
  device!: DeviceDTO;

  constructor(private route: ActivatedRoute, private deviceService: DeviceService, private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.deviceService.getDeviceById(id)
        .subscribe(device => {
          this.device = device;
          if(!this.device){
            this.goBack();
          }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
