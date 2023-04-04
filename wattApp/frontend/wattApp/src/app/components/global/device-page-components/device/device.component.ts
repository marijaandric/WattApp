import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomTypesService } from 'src/app/services/room-types/room-types.service';
import { ModelTypesService } from 'src/app/services/model-types/model-types.service';
import { DeviceTypesService } from 'src/app/services/device-types/device-types.service';
import { map } from 'rxjs';

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

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit{
  device!: DeviceDTO;

  displayEditDeviceDialog: boolean = false;
  editDeviceDialogForm! : FormGroup;
  isRunning: boolean = true;
  isVisibleToDSO: boolean = true;

  editDeviceForm! : FormGroup;
  types!: Types[];
  rooms!: Rooms[];
  models! : Models[];
  typeSelected! : string;
  modelSelected! : string;
  roomSelected! : string;

  constructor(private route: ActivatedRoute, 
              private deviceService: DeviceService, 
              private router: Router,
              private fromBuilder: FormBuilder,
              private roomTypesService: RoomTypesService,
              private modelTypesService: ModelTypesService,
              private deviceTypesService: DeviceTypesService) { }

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

      this.deviceTypesService.getAllDeviceTypes()
      .pipe(
        map(deviceTypes => deviceTypes.map(deviceType => ({ code: deviceType, name: deviceType })))
      )
      .subscribe(mappedDeviceTypes => {
        this.types = mappedDeviceTypes;
        this.typeSelected = this.device.deviceType;
        
    });

    this.roomTypesService.getAllRoomTypes()
      .pipe(
        map(roomTypes => roomTypes.map(roomType => ({ code: roomType, name: roomType })))
      )
      .subscribe(mappedRoomTypes => {
        this.rooms = mappedRoomTypes;
        this.roomSelected = this.device.room;
    });

    this.modelTypesService.getAllModelTypes()
      .pipe(
        map(modelTypes => modelTypes.map(modelType => ({ code: modelType, name: modelType })))
      )
      .subscribe(mappedModelTypes => {
        this.models = mappedModelTypes;
        this.modelSelected = this.device.deviceModel;
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

  onTypeChange(event:any){
    this.typeSelected = event.value.type;
    const filteredModels = this.models.filter(models => models.code === this.typeSelected);
    this.models = filteredModels;
    this.modelSelected = filteredModels[0].name;
  }
  onModelChange(event:any){
    this.modelSelected = event.value.models;
  }
  onRoomChange(event:any)
  {
    this.roomSelected = event.value.room;
  }

  save(){
    this.displayEditDeviceDialog = false;
  }

  deleteDevice(id: number) {
    this.deviceService.deleteDevice(id).subscribe(() => {
      this.navigateToDevices();
    });
  }
}
