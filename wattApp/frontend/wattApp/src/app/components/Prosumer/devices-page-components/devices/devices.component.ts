import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';

interface SwitchOption {
  label: string;
  value: boolean;
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit{
  hostElement: HTMLElement | undefined;
  lightMode: boolean = true;
  @Input() devices: any;
  numVisible: number = 5;
  devicesByRoomType: {[key: string]: DeviceDTO[]} = {};
  switchValue: boolean = true;

  responsiveOptions: any[] = [];
  carousel: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

  switchOptions: SwitchOption[] = [
    {label: 'List', value: true},
    {label: 'Table', value: false}
  ];

  ngOnInit():void {

    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const tabela = this.hostElement.querySelector('.tabela');
    this.renderer.addClass(tabela, 'light-theme-background-white');
    this.renderer.addClass(tabela, 'light-theme-bigger-shadow');

    /*
    innerElements.forEach((innerElement) => {
      this.renderer.addClass(innerElement, 'light-theme-color-gray');
    });
    this.hostElement.classList.forEach((DeviceCardComponent) => {
      const dvc = DeviceCardComponent as HTMLElement;
    })
    console.log(deviceCard);
    this.hostElement?.classList.toggle('light-theme-bigger-shadow', true);
    this.hostElement?.classList.add('light-theme-background-white');
*/
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 4,
          numScroll: 1
      },
      {
          breakpoint: '1220px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '900px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '500px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  constructor(private deviceService: DeviceService,
    private cdr: ChangeDetectorRef,private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.updateNumVisible(window.innerWidth);
    this.groupDevicesByRoomType();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateNumVisible(window.innerWidth);
  }

  private groupDevicesByRoomType() {
    this.devicesByRoomType = this.devices.reduce((acc: {[key: string]: DeviceDTO[]}, device: DeviceDTO)  => {
      if (!acc[device.room]) {
        acc[device.room] = [];
      }
      acc[device.room].push(device);
      return acc;
    }, {} as {[key: string]: DeviceDTO[]});
  }

  private updateNumVisible(windowWidth: number) {
    this.numVisible = 1;
  }

  clear(dtAllDevices: any) {
    dtAllDevices.clear();
  }

  onSearch(value: string, dtAllDevices: any) {
    dtAllDevices.filterGlobal(value, 'contains');
  }

  updateView() {
    this.cdr.detectChanges();
  }
  
  collapseDevices(index: number): void {
    this.carousel[index] = !this.carousel[index];
}
}
