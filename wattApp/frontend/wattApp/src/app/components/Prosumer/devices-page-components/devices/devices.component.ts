import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DeviceDTO } from 'src/app/dtos/DeviceDTO';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserService } from 'src/app/services/user/user.service';

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
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('dtAllDevices', { static: false }) table!: Table;

  hostElement: HTMLElement | undefined;
  lightMode: boolean = true;
  @Input() devices: any;
  numVisible: number = 5;
  devicesByRoomType: {[key: string]: DeviceDTO[]} = {};
  switchValue: boolean = true;
  
  statusFilterOptions: SelectItem[];
  selectedStatusFilter: any;

 

  responsiveOptions: any[] = [{breakpoint: '2300px',
  numVisible: 6,
  numScroll: 1
},{
    breakpoint: '2000px',
    numVisible: 5,
    numScroll: 1
},{
    breakpoint: '1700px',
    numVisible: 4,
    numScroll: 1
},
{
    breakpoint: '1500px',
    numVisible: 3,
    numScroll: 1
},
{
    breakpoint: '1300px',
    numVisible: 2,
    numScroll: 1
},
{
    breakpoint: '800px',
    numVisible: 1,
    numScroll: 1
}];
  carousel: boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

  switchOptions: SwitchOption[] = [
    {label: 'List', value: true},
    {label: 'Table', value: false}
  ];

  
  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement = this.elementRef.nativeElement as HTMLElement;
      this.lightMode = !dark;
    
    });

  }

  constructor(private deviceService: DeviceService,
              private cdr: ChangeDetectorRef,
              private elementRef: ElementRef, 
              private renderer: Renderer2,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) 
              { 
                this.statusFilterOptions = [
                  { label: 'Consumer', value: 'Consumer' },
                  { label: 'Producer', value: 'Producer' },
                  { label: 'Stock', value: 'Stock' }
                ];

                const storedValue = localStorage.getItem('switchValue');
                if (storedValue !== null) {
                  this.switchValue = JSON.parse(storedValue);
                } else {
                  localStorage.setItem('switchValue', JSON.stringify(this.switchValue));
                  this.switchValue = true; 
                }
              }

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
    this.searchInput.nativeElement.value = '';
    dtAllDevices.clear();
  }

  onSearch(value: string, dtAllDevices: any) {
    dtAllDevices.filterGlobal(value, 'contains');
  }

  updateView() {
    localStorage.setItem('switchValue', JSON.stringify(this.switchValue));
    this.cdr.detectChanges();
  }
  
  collapseDevices(index: number): void {
    this.carousel[index] = !this.carousel[index];
  }

  isCurrentRoute(route: string): boolean {
    return this.activatedRoute.snapshot.routeConfig?.path === route;
  }

  filterStatus(value: any) {
    this.table.filter(value, 'deviceType', 'equals');
  }

  getSeverity(label: string):string {
    if (label === 'Consumer') {
      return 'Consumer';
    } else if (label === 'Producer') {
      return 'Producer';
    } else if (label === 'Stock') {
      return 'Stock';
    } else {
      return 'All';
    }
  }
}
