import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomTypesService } from 'src/app/services/room-types/room-types.service';
import { ModelTypesService } from 'src/app/services/model-types/model-types.service';
import { DeviceTypesService } from 'src/app/services/device-types/device-types.service';
import { lastValueFrom, map, tap } from 'rxjs';

interface Models{
  code: string;
  name: string;
}

interface Rooms{
  code: string;
  name: string;
}

interface Types{
  code: string;
  name: string;
}

interface Datas{
  data: any[];
  date: any[];
}

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit{
  device!: DeviceDTO;

  displayEditDeviceDialog: boolean = false;
  isRunning: boolean = true;

  editDeviceDialogForm! : FormGroup;
  nameSelected!: string;
  types!: Types[];
  rooms!: Rooms[];
  models! : Models[];
  typeSelected! : Types;
  roomSelected! : Rooms;
  modelSelected! : Models;
  display3 : Boolean = false;

  
  array : any[]  = [null,null, null, null, null, null, null,null,null,null, null, null, null]
  array2 : any[] = [null,null, null, null, null, null,null,null, null, null, null, null,null]
  array3 : any[] = []


  constructor(private route: ActivatedRoute, 
              private deviceService: DeviceService, 
              private router: Router,
              private fromBuilder: FormBuilder,
              private roomTypesService: RoomTypesService,
              private modelTypesService: ModelTypesService,
              private deviceTypesService: DeviceTypesService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getHistoryAndForecastByDayForDevice(id)
    if (id){
      this.deviceService.getDeviceById(id)
        .subscribe(device => {
          this.device = device;
          if(!this.device){
            this.navigateToDevices();
          }

          this.deviceTypesService.getAllDeviceTypes().pipe(
            map(deviceTypes => deviceTypes.map(deviceType => ({ code: deviceType, name: deviceType }))),
            tap(() => this.typeSelected = { code: this.device.deviceType, name: this.device.deviceType }),
          ).subscribe(mappedDeviceTypes => {
            this.types = mappedDeviceTypes;
          });
          
          this.roomTypesService.getAllRoomTypes().pipe(
            map(roomTypes => roomTypes.map(roomType => ({ code: roomType, name: roomType }))),
            tap(() => this.roomSelected = { code: this.device.room, name: this.device.room }),
          ).subscribe(mappedRoomTypes => {
            this.rooms = mappedRoomTypes;
          });
          
          this.modelTypesService.getAllModelTypes().pipe(
            map(modelTypes => modelTypes.map(modelType => ({ code: modelType, name: modelType }))),
            tap(() => this.modelSelected = { code: this.device.deviceModel, name: this.device.deviceModel }),
          ).subscribe(mappedModelTypes => {
            this.models = mappedModelTypes;
          });
          
          this.nameSelected = this.device.deviceName;
      });

    } else{
      this.navigateToDevices();
    }
  }

  navigateToDevices(): void {
    this.router.navigateByUrl("devices");
  }

  showEditDeviceDialog() {
    this.displayEditDeviceDialog = true;
  }

  showDialog(){
    this.display3 = !this.display3 ;
  }

  async handleVisibilitySwitchChange(){
    await lastValueFrom(this.deviceService.updateDevice(this.device));
  }

  async handleManagementSwitchChange(){
    await lastValueFrom(this.deviceService.updateDevice(this.device));
  }

  async handleRunningSwitchChange(){
    await lastValueFrom(this.deviceService.updateDevice(this.device));
  }

  save(){
    this.device.deviceModel = this.modelSelected.name;
    this.device.deviceType = this.typeSelected.name;
    this.device.room = this.roomSelected.name;
    this.device.deviceName = this.nameSelected;
    this.deviceService.updateDevice(this.device).subscribe(
      (updatedDevice: DeviceDTO) => {
        this.displayEditDeviceDialog = false;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  cancel(){
    const id = this.device.id.toString();
    this.deviceService.getDeviceById(id)
        .subscribe(device => {
          this.device = device;
          if(!this.device){
            this.navigateToDevices();
          }
      });
    this.displayEditDeviceDialog = false;
  }

  deleteDevice(id: number) {
    this.deviceService.deleteDevice(id).subscribe(() => {
      this.navigateToDevices();
    });
  }


  getHistoryAndForecastByDayForDevice(id:any)
  {
    this.deviceService.getHistoryAndForecastByDayForDevice(id).subscribe(data => {
      let a = [];
      let b = [];
      let c = [];

      for(let i = 0;i<7;i++)
      {
        a[i] = data.datas[i].toFixed(2)
        c[i] = data.dates[i]
        b[i] = null
      }
      for(let i = 6;i<14;i++)
      {
        b[i] = data.datas[i].toFixed(2)
        c[i] = data.dates[i]
      }
      this.array = a;
      this.array2 =b;
      this.array3 = c;
    })
  }

}
