import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { StadardTemplateComponent } from 'src/app/components/global/layout-components/standard-template/stadard-template.component';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleTypesService } from 'src/app/services/role-types/role-types.service';
import { ModelTypesService } from 'src/app/services/model-types/model-types.service';
import { map } from 'rxjs';
import { RoomTypesService } from 'src/app/services/room-types/room-types.service';
import { DeviceTypesService } from 'src/app/services/device-types/device-types.service';
import { NgToastService } from 'ng-angular-popup';
import { DeviceCardComponent } from '../../devices-page-components/device-card/device-card.component';


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

interface Roles{
  code :string;
  name: string;
}

@Component({
  selector: 'app-prosumerhome',
  templateUrl: './prosumerhome.component.html',
  styleUrls: ['./prosumerhome.component.css']
})
export class ProsumerhomeComponent implements OnInit{
  hostElement : HTMLElement | undefined;
  lightMode: Boolean = false;
  loader = true;
  user:any;
  id: any;
  token = localStorage.getItem('token');
  devices: any[] = [];
  quote:string = "It's great to see you here! Thanks for joining us."
  quotes :string[] = ["It's great to see you here! Thanks for joining us.","We've been waiting for you! Welcome to our website.",
"Welcome to our online family! We can't wait to get to know you better.","Thanks for stopping by! We hope you enjoy your time on our page.",
"Welcome to our virtual home. Feel free to make yourself comfortable.","A warm welcome to you! We hope our page is just what you're looking for.",
"We're honored to have you as our guest. "];

types!: Types[];
rooms!: Rooms[];
models! : Models[];
roleSelected! : string;
typeSelected! : Types;
modelSelected! : Models;
roomSelected! : Rooms;

  addDeviceForm! : FormGroup;
  display = false;
  display2 = false;

  @Input() device:any={id:1,deviceName: "default", deviceType:"Consumer",power: 10,power2:12}
  @Input() device1:any={id:1,deviceName: "default", deviceType:"Producer",power: 10,power2:2}
  @Input() device2:any={id:1,deviceName: "default", deviceType:"Stock",power: 10,power2:20}

  constructor(private fb: FormBuilder,private userService:UserService,private http: HttpClient,private deviceService : DeviceService,private dsonew : DsonewsService,private roomTypesService: RoomTypesService, 
    private roleTypesService: RoleTypesService,
    private modelTypesService: ModelTypesService,
    private deviceTypesService: DeviceTypesService,private toast:NgToastService,private cdRef: ChangeDetectorRef, private elementRef: ElementRef, private renderer: Renderer2)
  {
    this.quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    if(this.token)
    {
      this.id = this.userService.getUserIdFromToken(this.token);
      userService.GetUser(this.id,this.token).subscribe((data) => {
        this.user = data;
        //this.ngOnInit();
      });
    }
    
  }

  IdBiggestConsumer: any;
  NameBiggestConsumer: any;
  PowerUsageBiggestConsumer : any;
  
  getBiggestConsumer() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Consumer';
    const max = 'max';
    
    this.deviceService.getBiggest(this.id,year,month,day,consumer,max).subscribe((response: any) => {
       this.PowerUsageBiggestConsumer=response.averagePowerUsage.toFixed(2);
       this.device = response.device
       this.devices[0] = this.device
       this.device.power2 = this.PowerUsageBiggestConsumer
       this.cdRef.markForCheck()
       this.loader = false;
    },(error: any) => {
      this.loader = false;
    });
  }

   IdBiggestProducer: any;
  NameBiggestProducer: any;
  PowerUsageBiggestProducer : any;
  


  getBiggestProducer() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Producer';
    const max = 'max';

    this.deviceService.getBiggest(this.id,year,month,day,consumer,max).subscribe((response: any) => {
      this.PowerUsageBiggestProducer=response.averagePowerUsage.toFixed(2);
       this.device1 = response.device
       this.device1.power2 = this.PowerUsageBiggestProducer
       this.devices[1] = this.device1
       this.cdRef.markForCheck()
       //this.loader = false;
    },(error: any) => {
      this.loader = false;
    });
  
  }
  IdBiggestStorage: any;
  NameBiggestStorage: any;
  PowerUsageBiggestStorage: any;
  


  getBiggestStorage() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Stock';
    const max = 'max';


    this.deviceService.getBiggest(this.id,year,month,day,consumer,max).subscribe((response: any) => {
       this.PowerUsageBiggestStorage=response.averagePowerUsage.toFixed(2);
       this.device2 = response.device
       this.device2.power2 = this.PowerUsageBiggestStorage
       this.devices[2] = this.device2
       this.cdRef.markForCheck()
      },(error: any) => {
        this.loader = false;
      });
  
  }




  monthPowerUsageConsumer: any;
  
  getmonthPowerUsageConsume() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Consumer';

  this.deviceService.getmonth(this.id,year,month,consumer).subscribe((response: any) => {
      this.monthPowerUsageConsumer=response.toFixed(2);
    });
  
  }

  monthPowerUsageProducer: any;
  
  getmonthPowerUsageProducer() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Producer';


    this.deviceService.getmonth(this.id,year,month,consumer).subscribe((response: any) => {
      this.monthPowerUsageProducer=response.toFixed(2);
    });
  
  }

  monthPowerUsageStorage: any;
  
  getmonthPowerUsageStorage() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const consumer = 'Stock';

    this.deviceService.getmonth(this.id,year,month,consumer).subscribe((response: any) => {
      this.monthPowerUsageStorage=response.toFixed(2);
    });
  
  }

  dayPowerPrice: any;
  
  getdayPowerPrice() {
  
    this.deviceService.getprice().subscribe((response: any) => {
      this.dayPowerPrice=response.toFixed(2);
    });
  
  }

  news: any[] = [];
  
  naslov1 : any;
  naslov2 : any;
  naslov3 : any;

  sadrzaj1 : any;
  sadrzaj2 : any;
  sadrzaj3 : any;

  datum1 : any;
  datum2 : any;
  datum3 : any;

  status1 : any;
  status2 : any;
  status3 : any;

  desc1 :any;
  desc2 :any;
  desc3 :any;

  id1!:number;
  id2!:number;
  id3!:number;
  getNews() {
  
    this.dsonew.getnew().subscribe((data: any) => {
      this.news = data;
      this.news.sort((a, b) => b.id - a.id);
      //console.log(data);

      this.id1 = this.news[0].id
      this.id2 = this.news[2].id
      this.id3 = this.news[3].id

     this.naslov1 = this.news[0].title;
     this.naslov2 = this.news[1].title;
     this.naslov3 = this.news[2].title;

     this.desc1 = this.news[0].content;
     this.desc2 = this.news[1].content;
     this.desc3 = this.news[2].content;

     this.sadrzaj1 = this.news[0].description;
     this.sadrzaj2 = this.news[1].description;
     this.sadrzaj3 = this.news[2].description;

     this.datum1 = new Date(this.news[0].created).toLocaleDateString();
     this.datum2 = new Date(this.news[1].created).toLocaleDateString();
     this.datum3 = new Date(this.news[2].created).toLocaleDateString();

     this.status1 = this.news[0].priority;
     this.status2 = this.news[1].priority;
     this.status3 = this.news[2].priority;

    });
  
  }



  async ngOnInit(): Promise<void> {
    
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;

      
    });


    this.devices[0]=this.device;
    this.devices[1] = this.device1;
    this.devices[2] = this.device2;
    this.getNews();
    this.getBiggestConsumer();
    this.getBiggestProducer();
    this.getBiggestStorage();
    this.getmonthPowerUsageConsume();
    this.getmonthPowerUsageProducer();
    this.getmonthPowerUsageStorage();
    this.getdayPowerPrice();

    this.addDeviceForm = this.fb.group({
      userID :[0, Validators.required],
      deviceName:['', Validators.required],
      deviceModel: ['', Validators.required],
      room: ['', Validators.required],
      model:['', Validators.required],
      manufacturer:['', Validators.required],
      manufacturingYear:['', Validators.required],
      power:['', Validators.required],
      deviceType: ['', Validators.required],
    })

    this.deviceTypesService.getAllDeviceTypes()
      .pipe(
        map(deviceTypes => {
          return Object.entries(deviceTypes).map(([code, name]) => ({ code, name }));
        })
      )
      .subscribe(mappedDeviceTypes => {
        this.types = mappedDeviceTypes;
        this.typeSelected = this.types[0];

        this.modelTypesService.getAllModelTypes(this.typeSelected.code)
          .pipe(
            map(modelTypes => Object.entries(modelTypes).map(([code, name]) => ({ code, name })))
          )
          .subscribe(mappedModelTypes => {
            this.models = mappedModelTypes;
            this.modelSelected = this.models[0];
        });
    });

    this.roomTypesService.getAllRoomTypes()
      .pipe(
        map(roomTypes => Object.entries(roomTypes).map(([code, name]) => ({ code, name })))
      )
      .subscribe(mappedRoomTypes => {
        this.rooms = mappedRoomTypes;
        this.roomSelected = this.rooms[0];
    });
  }


  showDisplay()
  {
    this.display = !this.display;
  }
  

  naslov:any;
  opis:any;
  desc:any;
  date:any;
  priority:any;

  showDisplay2(id:number)
  {
    //this.display2 = !this.display2;
  }

  onTypeChange(event:any){
    this.typeSelected = event.value;

    this.modelTypesService.getAllModelTypes(this.typeSelected.code)
      .pipe(
        map(modelTypes => Object.entries(modelTypes).map(([code, name]) => ({ code, name })))
      )
      .subscribe(mappedModelTypes => {
        this.models = mappedModelTypes;
        this.modelSelected = this.models[0];
    });
  }

  onModelChange(event:any){
    this.modelSelected = event.value;
  }
  
  onRoomChange(event:any)
  {
    this.roomSelected = event.value;
  }

  addDevice()
  {
    
    this.addDeviceForm.patchValue({
      deviceType : this.typeSelected.name
    })
    this.addDeviceForm.patchValue({
      userID : this.id
    })
    this.addDeviceForm.patchValue({
      deviceModel : this.modelSelected.name
    })
    this.addDeviceForm.patchValue({
      room : this.roomSelected.name
    })
    this.addDeviceForm.patchValue({
      manufacturingYear : this.addDeviceForm.get('manufacturingYear')?.value + " "
    })
    
    

    if(!this.addDeviceForm.value.deviceName)
    {
      this.toast.error({detail:"ERROR",summary:"Please fill in all fields.",duration:4000});
      return
    }
    
    this.deviceService.AddDevice(this.addDeviceForm.value).subscribe({
      next:(res => {
        this.addDeviceForm.reset()
        this.toast.success({detail:"SUCCESS",summary:"You have successfully added device",duration:5000});
        this.display2 = false;
      setTimeout(() => {
        location.reload();
      }, 1350)

      }),
      error:(err => {
        this.toast.error({detail:"ERROR",summary:"Our team is working diligently to resolve the issue and get everything back up and running smoothly!",duration:4000});
      })
    }) 
  }
  

}
