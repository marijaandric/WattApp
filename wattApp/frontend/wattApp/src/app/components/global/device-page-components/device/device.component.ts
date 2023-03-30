import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent {
  device!: DeviceDTO;
  displayEditDeviceDialog: boolean = false;
  editDeviceDialogForm! : FormGroup;
  isRunning: boolean = true;
  isVisibleToDSO: boolean = true;
  isDSOControll: boolean = true;

  constructor(private route: ActivatedRoute, private deviceService: DeviceService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.deviceService.getDeviceById(id)
        .subscribe(device => {
          this.device = device;
          if(!this.device){
            this.navigateToDevices();
          }
      });
    }
  }

  navigateToDevices(): void {
    this.router.navigateByUrl("devices");
  }

  showEditDeviceDialog() {
    this.displayEditDeviceDialog = true;
  }

  save(){
    this.displayEditDeviceDialog = false;
  }

  deleteDevice(id: number) {
    console.log("Deleting device with ID: " + id);
    this.deviceService.deleteDevice(id).subscribe(() => {
      this.navigateToDevices();
    });
  }
}
