import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomTypesService } from 'src/app/services/room-types/room-types.service';
import { ModelTypesService } from 'src/app/services/model-types/model-types.service';
import { DeviceTypesService } from 'src/app/services/device-types/device-types.service';
import { lastValueFrom, map, tap } from 'rxjs';
import { HistoryLineChartComponent } from 'src/app/components/Prosumer/history-line-chart/history-line-chart.component';
import { HistoryForecastComponent } from '../../history-forecast/history-forecast.component';
import { ForecastLineChartComponent } from 'src/app/components/Prosumer/forecast-line-chart/forecast-line-chart.component';

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

interface City {
  name: string,
  code: string
}
interface SwitchOption {
  label: string;
  value: boolean;
}

interface HiF{
  history: any,
  forecast: any,
  date1: any,
  date2: any
}

@Component({
  selector: 'app-device-phone',
  templateUrl: './device-phone.component.html',
  styleUrls: ['./device-phone.component.scss']
})
export class DevicePhoneComponent implements OnInit{
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
  array4 : any[] = [null,null,null,null,null,null,null]
  array5 : any[] = [null,null,null,null,null,null,null]
  date1 : any[] = []
  date2: any[] = []

  hif : HiF[]  = [{history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []}];

  switchValue: boolean = true;

  switchOptions: SwitchOption[] = [
    {label: 'History', value: true},
    {label: 'Forecast', value: false}
  ];


  constructor(private route: ActivatedRoute, 
              private deviceService: DeviceService, 
              private router: Router,
              private fromBuilder: FormBuilder,
              private roomTypesService: RoomTypesService,
              private modelTypesService: ModelTypesService,
              private deviceTypesService: DeviceTypesService) 
              { }

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
            map(deviceTypes => {
              return Object.entries(deviceTypes).map(([code, name]) => ({ code, name }));
            }),
            tap(() => this.typeSelected = { code: this.device.deviceType, name: this.device.deviceType }),
            ).subscribe(mappedDeviceTypes => {
              this.types = mappedDeviceTypes;

              this.modelTypesService.getAllModelTypes(this.typeSelected.code).pipe(
                map(modelTypes => {
                  return Object.entries(modelTypes).map(([code, name]) => ({ code, name }));
                }),
                tap(() => this.modelSelected = { code: this.device.deviceModel, name: this.device.deviceModel }),
              ).subscribe(mappedModelTypes => {
                this.models = mappedModelTypes;
              });
          });
          
          this.roomTypesService.getAllRoomTypes().pipe(
            map(roomTypes => {
              return Object.entries(roomTypes).map(([code, name]) => ({ code, name }));
            }),
            tap(() => this.roomSelected = { code: this.device.room, name: this.device.room }),
          ).subscribe(mappedRoomTypes => {
            this.rooms = mappedRoomTypes;
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
      let d = [];
      let x = [];

      for(let i = 0;i<7;i++)
      {
        a[i] = data.datas[i].toFixed(2)
        c[i] = data.dates[i]
        b[i] = null
      }
      this.array4 = a;
      this.date1 = c;

      let br = 0
      for(let i = 6;i<14;i++)
      {
        b[i] = data.datas[i].toFixed(2)
        c[i] = data.dates[i]
        d[br] = data.datas[i].toFixed(2)
        x[br] = data.dates[i]
        br++;

      }
      this.array = a;
      this.array2 =b;
      this.array3 = c;
      this.array5 = d;
      this.date2 = x;

      for(let i = 0;i<7;i++)
      {
        this.hif[i].history = this.array[i];
        this.hif[i].forecast = this.array5[i];
        this.hif[i].date1 = this.array3[i];
        this.hif[i].date2 = this.array3[i+7];
      }
    })
  }

}
