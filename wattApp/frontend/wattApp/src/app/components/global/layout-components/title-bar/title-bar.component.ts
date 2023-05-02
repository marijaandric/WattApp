import { Token } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild, ɵɵqueryRefresh } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeviceTypesService } from 'src/app/services/device-types/device-types.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { ModelTypesService } from 'src/app/services/model-types/model-types.service';
import { RoleTypesService } from 'src/app/services/role-types/role-types.service';
import { RoomTypesService } from 'src/app/services/room-types/room-types.service';
import { UserService } from 'src/app/services/user.service';
import axios from 'axios';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';
import { url } from 'src/app/app.module';

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
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit{
  display : boolean = false;
  display2 : boolean = false;
  display3 : boolean = false;
  display4 : boolean = false;
  signUpForm! : FormGroup;
  addDeviceForm! : FormGroup;
  newsForm! :FormGroup;
  changePassForm!:FormGroup;
  roles!: Roles[];
  types!: Types[];
  rooms!: Rooms[];
  models! : Models[];
  modelsRez! : Models[];
  roleSelected! : string;
  typeSelected! : string;
  modelSelected! : string;
  roomSelected! : string;
  showText = false;
  rola:any;
  value!:string;
  address!:string;
  selectedPriority:string = 'None';
  baseUrl = url + "/api/Images/user/";
  userImageUrlEndpoint!: string;
  id:number = 0;

  isMenuOpen = false;
  user : any;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
 
  
  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private toast: NgToastService,
              private userService: UserService,
              private deviceService: DeviceService, 
              private deviceTypesService: DeviceTypesService, 
              private roomTypesService: RoomTypesService, 
              private roleTypesService: RoleTypesService,
              private modelTypesService: ModelTypesService,
              private dsonewsService : DsonewsService,
              private auth:AuthService) {

    const token = localStorage.getItem('token');
    if(token)
    {
      this.id = this.userService.getUserIdFromToken(token)
    }
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if(token)
    {
      this.rola = this.userService.getUserRoleFromToken(token);
      const userId = this.userService.getUserIdFromToken(token);
      this.userImageUrlEndpoint = this.baseUrl + userId;
      this.userService.GetUser(userId,token).subscribe(data=>{
        this.user = data;
      })
    }

    this.roleTypesService.getAllRoleTypes()
      .pipe(
        map(roleTypes => roleTypes.map(roleType => ({ code:roleType, name: roleType })))
      )
      .subscribe(mappedRoleTypes => {
        this.roles = mappedRoleTypes;
        this.roleSelected = this.roles[0].name;
        if (this.rola == "operator") {
          this.roles = this.roles.filter(roleType => roleType.name === 'prosumer');
        }
        else if (this.rola == "admin") {
          this.roles = this.roles.filter(roleType => roleType.name === 'prosumer' || roleType.name === 'operator');
        }
    });

    this.deviceTypesService.getAllDeviceTypes()
      .pipe(
        map(deviceTypes => deviceTypes.map(deviceType => ({ code: deviceType, name: deviceType })))
      )
      .subscribe(mappedDeviceTypes => {
        this.types = mappedDeviceTypes;
        this.typeSelected = this.types[0].name;
        
    });

    this.roomTypesService.getAllRoomTypes()
      .pipe(
        map(roomTypes => roomTypes.map(roomType => ({ code: roomType, name: roomType })))
      )
      .subscribe(mappedRoomTypes => {
        this.rooms = mappedRoomTypes;
        this.roomSelected = this.rooms[0].name;
    });

    this.modelTypesService.getAllModelTypes()
      .pipe(
        map(modelTypes => modelTypes.map(modelType => ({ code: modelType, name: modelType })))
      )
      .subscribe(mappedModelTypes => {
        this.models = mappedModelTypes;
        this.modelsRez = this.models;
        this.modelSelected = this.models[0].name;
    });

    this.isAdmin();

    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      role: ['', Validators.required],
      token:['', Validators.required],
      refreshToken:['', Validators.required],
      x: ['', Validators.required],
      y: ['', Validators.required],
      oblast :['', Validators.required],
    });

    this.addDeviceForm = this.fb.group({
      userID :[0, Validators.required],
      deviceName:['', Validators.required],
      deviceModel: ['', Validators.required],
      room: ['', Validators.required],
      deviceType: ['', Validators.required],
    })

    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      userID :[0, Validators.required],
      content: ['', Validators.required],
      priority: ['Regular', Validators.required],
      created: ['', Validators.required],
    })

    this.changePassForm = this.fb.group({
      id: [0, Validators.required],
      currentPassword :['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })


  }
  logout()
  {
    this.auth.logout();
  }
  // prikaz dijaloga
   showDialog(){
    this.display = true;
    
  }

  showDialog2(){
    this.display2 = true;
  }

  showDialog3(){
    this.display3 = true;
  }

  showDialog4(){
    this.display4 = true;
  }

  //od mape
  receiveMessage(message : any) {
    this.address = message.address
    if(message.district == null)
    {
      message.district = "Grad Kragujevac"
    }
    this.signUpForm.patchValue({
      x : message.lat
    })
    this.signUpForm.patchValue({
      y : message.lon
    })
    this.signUpForm.patchValue({
      address : this.address
    })
    this.signUpForm.patchValue({
      oblast : message.district
    })
  }

  async onAddressChange(event:any){
    this.value = event.target.value;
  }

  //dropdown event
  onRoleChange(event:any){
    this.roleSelected = event.value.name;
  }

  onTypeChange(event:any){
    this.typeSelected = event.value.type;
    this.models = this.modelsRez;
    const filteredModels = this.models.filter(models => models.code === this.typeSelected);
    this.models = filteredModels;
    this.modelSelected = filteredModels[0].name;
  }
  onModelChange(event:any){
    this.modelSelected = event.value.name;
  }
  onRoomChange(event:any)
  {
    this.roomSelected = event.value.name;
  }

  //registracija
  onSignUp()
  {
    this.signUpForm.patchValue({
      role : this.roleSelected
    })

    if(this.signUpForm && this.signUpForm.value.password === this.signUpForm.value.password2)
    {
      this.authService.signUp(this.signUpForm.value).subscribe({
        next:(res => {
          this.signUpForm.reset()
          this.toast.success({detail:"SUCCESS",summary:"You have successfully registered",duration:4000});
          this.display = false;
        }),
        error:(err => {
          this.toast.error({detail:"ERROR",summary:"Error",duration:4000});
        })
        
      })
    }
    else{
      this.toast.error({detail:"ERROR",summary:"Error",duration:4000});
      this.validateAllFormFields(this.signUpForm)
    }
  }

  addDevice()
  {
    
    this.addDeviceForm.patchValue({
      deviceType : this.typeSelected
    })
    this.addDeviceForm.patchValue({
      userID : this.id
    })
    this.addDeviceForm.patchValue({
      deviceModel : this.modelSelected
    })
    this.addDeviceForm.patchValue({
      room : this.roomSelected
    })
    console.log(this.addDeviceForm.value)
    this.deviceService.AddDevice(this.addDeviceForm.value).subscribe({
      next:(res => {
        this.addDeviceForm.reset()
        this.toast.success({detail:"SUCCESS",summary:"You have successfully added device",duration:4000});
        this.display2 = false;
      }),
      error:(err => {
        this.toast.error({detail:"ERROR",summary:"Error",duration:4000});
      })
    }) 
  }
  
  addNews()
  {
    
    this.newsForm.patchValue({
      userID : this.id
    })
    this.newsForm.patchValue({
      created: new Date()
    });

  
    console.log(this.newsForm.value);
    this.dsonewsService.AddNews(this.newsForm.value).subscribe({
      next:(res => {
        this.newsForm.reset()
        this.toast.success({detail:"SUCCESS",summary:"You have successfully added news",duration:4000});
        this.display3 = false;
      }),
      error:(err => {
        this.toast.error({detail:"ERROR",summary:"Error",duration:4000});
      })
    }) 
  }

  //validacija
  private validateAllFormFields(formGroup : FormGroup)
  {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }

  // da li je neko admin 
  isAdmin(): boolean {
    const token = this.authService.getToken();
    if (!token) {
      return false;
    }
    const userRole = this.userService.getUserRoleFromToken(token);
    return userRole === 'operator' || userRole === 'admin' || userRole === 'superadmin';
  }

  setMenuClose()
  {
    this.isMenuOpen = false;
  }

  savePass()
  {
    this.changePassForm.patchValue({
      id: this.id
    });
    if(this.changePassForm.value.confirmPassword != this.changePassForm.value.newPassword)
    {
      this.toast.error({detail:"ERROR",summary:"Error, u must enter the same password twice",duration:4000});
      return;
    }

    this.authService.changePassword(this.changePassForm.value).subscribe({
      next:(res => {
        this.changePassForm.reset()
        this.toast.success({detail:"SUCCESS",summary:"You have successfully changed password",duration:4000});
        this.display4 = false;
      }),
      error:(err => {
        this.toast.error({detail:"ERROR",summary:"Error",duration:4000});
      })
    }) 
  }

  
}
