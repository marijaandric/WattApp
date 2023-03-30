import { Token } from '@angular/compiler';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserService } from 'src/app/services/user.service';

interface Roles{
  role:string;
}

interface Types{
  type:string;
}

interface Models{
  type : string;
  models:string;
}

interface Rooms{
  room:string;
}

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit{
  display : boolean = false;
  display2 : boolean = false;
  signUpForm! : FormGroup;
  addDeviceForm! : FormGroup;
  roles : Roles[];
  types : Types[];
  models : Models[];
  modelsRez : Models[];
  rooms : Rooms[];
  roleSelected : string;
  typeSelected : string;
  modelSelected : string;
  roomSelected : string;
  showText = false;
  rola:any;
  
  constructor(private router:Router,private fb: FormBuilder,private authService: AuthService,private toast:NgToastService,private userService:UserService,private deviceService:DeviceService) {
    this.roles = [
      {role:'prosumer'},
      {role:'operator'},
      {role:'admin'},
      {role:'superAdmin'},
  ];

    this.types=[
      {type:'Consumer'},
      {type:'Producer'},
      {type:'Stock'}
    ]

    this.models=[
      {models:'Lamp',type:'Consumer'},
      {models:'Fans',type:'Consumer'},
      {models:'Television',type:'Consumer'},
      {models:'Computer',type:'Consumer'},
      {models:'Laptop',type:'Consumer'},
      {models:'Fridge',type:'Consumer'},
      {models:'Air conditioner',type:'Consumer'},
      {models:'Washing machine',type:'Consumer'},
      {models:'Dryer',type:'Consumer'},
      {models:'Microwave',type:'Consumer'},
      {models:'Vacuum cleaner',type:'Consumer'},
      {models:'Curling iron',type:'Consumer'},
      {models:'Charger',type:'Consumer'},
      {models:'Solar panel',type:'Producer'},
      {models:'Wind turbine',type:'Producer'},
      {models:'Generators',type:'Producer'},
      {models:'Batteries',type:'Stock'},
      {models:'Capacitors',type:'Stock'}
    ]

    this.modelsRez = this.models;

    this.rooms=[
      {room:'Living room'},
      {room:'Dining room'},
      {room:'Kitchen'},
      {room:'Bedroom'},
      {room:'Bathroom'},
      {room:'Home office'},
      {room:'Laundry room'},
      {room:'Garage'},
      {room:'Basement'},
      {room:'Game room'},
      {room:'Guest room'},
      {room:'Hallway'},
      {room:'Roof'},
      {room:'Garden'},
    ]
  this.roleSelected = 'prosumer';
  this.typeSelected = 'Consumer';
  this.modelSelected = 'Lamp';
  this.roomSelected = 'Living room';
  
  }

  ngOnInit(): void {
    this.isAdmin();
    if(this.rola == "operator")
    {
      this.roles = [
        {role:'prosumer'}
    ];
    }
    else if(this.rola == "admin")
    {
      this.roles = [
        {role:'prosumer'},
        {role:'operator'}
    ];
    }
    else
    {
      this.roles = [
        {role:'prosumer'},
        {role:'operator'},
        {role:'admin'},
        {role:'superadmin'},
    ];
    }


    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.addDeviceForm = this.fb.group({
      userID :[0, Validators.required],
      deviceName: ['', Validators.required],
      deviceModel: ['', Validators.required],
      room: ['', Validators.required],
      deviceType: ['', Validators.required],
    })
  }

  // prikaz dijaloga
  showDialog(){
    this.display = true;
  }

  showDialog2(){
    this.display2 = true;
  }

  //dropdown event
  onRoleChange(event:any){
    this.roleSelected = event.value.role;
  }

  onTypeChange(event:any){
    this.typeSelected = event.value.type;
    this.models = this.modelsRez;
    const filteredModels = this.models.filter(models => models.type === this.typeSelected);
    this.models = filteredModels;
    this.modelSelected = filteredModels[0].models
  }
  onModelChange(event:any){
    this.modelSelected = event.value.models;
  }
  onRoomChange(event:any)
  {
    this.roomSelected = event.value.room;
  }

  //registracija
  onSignUp()
  {
    this.signUpForm.patchValue({
      role : this.roleSelected
    })
    if(this.signUpForm.valid)
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
    const token = localStorage.getItem('token');
    let id = 0;
    if(token)
    {
      id = this.userService.getUserIdFromToken(token)
    }
    
    this.addDeviceForm.patchValue({
      deviceType : this.typeSelected
    })
    this.addDeviceForm.patchValue({
      userID : id
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
  isAdmin()
  {
    const token = this.authService.getToken();
    if(token)
    {
      if(this.userService.getUserRoleFromToken(token))
      {
        this.rola = this.userService.getUserRoleFromToken(token);
        if(this.rola == "prosumer")
        {
          return false;
        }
        else{
          return true;
        }
      }
    }
    return false;
    
  }
}
