import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceDataDTO } from 'src/app/dtos/DeviceDataDTO';
import { DeviceDataService } from 'src/app/services/device-data/device-data.service';
import { DeviceService } from 'src/app/services/device/device.service';


@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit,OnChanges{
  hostElement: HTMLElement | undefined;
  @Input() device: any;
  @Input() devices: any;
  isChecked: boolean = true;
  display: boolean = false;

  //za ikonice
  isPhone: boolean = false;
  isTablet: boolean = false;
  isLaptop: boolean = false;
  isDesktop: boolean = false;
  isSmartwatch: boolean = false;
  isSmartTV: boolean = false;
  isGamingConsole: boolean = false;
  isVirtualAssistant: boolean = false;
  isCamera: boolean = false;
  isDrone: boolean = false;
  isWearable: boolean = false;
  isSmartHomeHub: boolean = false;
  isCar: boolean = false;
  isHeadset: boolean = false;
  isSpeaker: boolean = false;
  isSolarPanel: boolean = false;
  isBattery: boolean = false;
  isFridge: boolean = false;
  isMicrowave: boolean = false;
  isWashingMachine: boolean = false;
  isMixer: boolean = false;
  isBlender: boolean = false;
  isRadio: boolean = false;
  isStove: boolean = false;
  isVacuumCleaner: boolean = false;
  isIron: boolean = false;
  isLamp: boolean = false;
  isBulb: boolean = false;
  isOther: boolean = false;

  isConsumer: boolean = false;
  isProducer: boolean = false;
  isStock: boolean = false;

  constructor(private deviceService: DeviceService,private cdRef: ChangeDetectorRef, private elementRef: ElementRef, private renderer: Renderer2){ }

  ngOnInit(): void {
    
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    console.log(this.hostElement);
    const dvcCard = this.hostElement.querySelector('.device-card');
    console.log(dvcCard);
    this.renderer.addClass(dvcCard, 'light-theme-bigger-shadow');
    this.renderer.addClass(dvcCard, 'light-theme-background-white');
    const spans = this.hostElement.querySelectorAll('.device-card span');
    spans.forEach((span) => {
      this.renderer.addClass(span, 'light-theme-text-color-dark-gray');
    });
    if(!this.device.power)
    {
      const min = 0;
      const max = 15;
      this.device.power = (Math.random() * (max - min) + min).toFixed(2);
      this.isChecked = this.device.isActive;
    }
    
    
    switch(this.device.deviceType) {
      case "Consumer":
        this.isConsumer = true;
        break;
      case "Producer":
        this.isProducer = true;
        break;
      case "Stock":
        this.isStock = true;
        break;
    }

    switch(this.device.deviceModel){
      case "Phone":
        this.isPhone = true;
        break;
      case "Tablet":
        this.isTablet = true;
        break;
      case "Laptop":
        this.isLaptop = true;
        break;
      case "Desktop":
        this.isDesktop = true;
        break;
      case "Smartwatch":
        this.isSmartwatch = true;
        break;
      case "Smart TV":
        this.isSmartTV = true;
        break;
      case "Gaming Console":
        this.isGamingConsole = true;
        break;
      case "Virtual Assistant":
        this.isVirtualAssistant = true;
        break;
      case "Camera":
        this.isCamera = true;
        break;
      case "Drone":
        this.isDrone = true;
        break;
      case "Wearable":
        this.isWearable = true;
        break;
      case "Smart Home Hub":
        this.isSmartHomeHub = true;
        break;
      case "Car":
        this.isCar = true;
        break;
      case "Headset":
        this.isHeadset = true;
        break;
      case "Speaker":
        this.isSpeaker = true;
        break;
      case "Solar panel":
        this.isSolarPanel = true;
        break;
      case "Battery":
        this.isBattery = true;
        break;
      case "Fridge":
        this.isFridge = true;
        break;
      case "Microwave":
        this.isMicrowave = true;
        break;
      case "Washing machine":
        this.isWashingMachine = true;
        break;
      case "Mixer":
        this.isMixer = true;
        break;
      case "Blender":
        this.isBlender = true;
        break;
      case "Radio":
        this.isRadio = true;
        break;
      case "Stove":
        this.isStove = true;
        break;
      case "Vacuum cleaner":
        this.isVacuumCleaner = true;
        break;
      case "Iron":
        this.isIron = true;
        break;
      case "Lamp":
        this.isLamp = true;
        break;
      case "Bulb":
        this.isBulb = true;
        break;
      default:
        this.isOther = true;
        break;
    }

  }

  async handleRunningSwitchChange(){
    this.isChecked = !this.isChecked // za alert izbrisati ovo
    this.device.isActive = this.isChecked 
    await lastValueFrom(this.deviceService.updateDevice(this.device));
    this.display = false; // za alert izbrisati ovo
  }

  ngOnChanges(changes:SimpleChanges)
  {
    this.device = this.device;
    this.isChecked = this.device.isActive
  }

  showDialog(event: MouseEvent) {
    event.stopPropagation();
    this.isChecked = !this.isChecked
    this.display = !this.display;
  }

  // ngOnChanges() {
  //   // Update the switch button state when the device.isActive property changes
  //   const switchButton = document.querySelector('#mySwitch');
  //   if (switchButton) {
  //     switchButton['checked'] = this.device.isActive;
  //   }
  // }

  // onSwitchChange(newVal: boolean) {
  //   //this.showDialog();
  //   const confirmed = confirm('Do you want to change the device activity?');
  //   if (confirmed) {
  //     this.device.isActive = newVal;
  //     this.handleRunningSwitchChange();
  //   }

  //   // const confirmed = this.showDialog();
  //   // if (confirmed) {
  //   //   this.device.isActive = newVal;
  //   // }

    
  // }

  onSwitchChange() {
    //this.showDialog();
     const confirmed = confirm('Do you want to change the device activity?');
    if (confirmed) {
      this.handleRunningSwitchChange();
    }
    else{
    this.isChecked = !this.isChecked
    }
    
  }


}
