import { Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Map, tileLayer, marker } from 'leaflet';
import * as L from 'leaflet';
import { UserDTO } from 'src/app/dtos/UserDTO';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent implements OnInit,OnChanges{
  hostElement: HTMLElement | undefined;
  lightMode: Boolean = false;
  map: any;
  user : any;
  private darkLayer!: L.TileLayer;
  private lightLayer!: L.TileLayer;
  id:any;
  userInfo: any;

  constructor(private userService: UserService, private elementRef: ElementRef, private renderer: Renderer2,private router:ActivatedRoute)
  {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getUser()
  }

  getUser()
  {
    const token = localStorage.getItem('token');
    
    if(token)
    {
      const userId = this.userService.getUserIdFromToken(token);
      this.userService.GetUser(this.id,token).subscribe((data) => {
        this.userInfo = data;
      });
      
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userService.GetUserWithoutToken(this.id).toPromise()
    .then(data=>{
      this.userInfo = data;
    });
  }

  async ngOnInit(): Promise<void> {
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
    });      

    await this.userService.GetUserWithoutToken(this.id).toPromise()
      .then(data=>{
        this.userInfo = data;
    });

    this.map = L.map('adminMap').setView([this.userInfo.x, this.userInfo.y], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.darkLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', { //https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
      attribution: '&copy; OpenStreetMap contributors'
    });
    this.lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });

    const markerIcon = L.icon({
      iconUrl: '/assets/icons/images/marker-pink.png',
      iconRetinaUrl: '/assets/icons/images/marker-pink.png',
      iconSize: [50, 50],
      iconAnchor: [25,55],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowUrl: '/assets/icons/images/marker-shadow.png',
      shadowSize: [60, 60],
      shadowAnchor: [20,65]
    });

    if(this.userInfo != null)
    {
        const lan = this.userInfo.x;
        const lon = this.userInfo.y
        const id = this.userInfo.id
        this.map.setView([lan, lon], 14);
        if (lan != undefined && lon != undefined) {
          const marker = L.marker([lan, lon], {icon : markerIcon}).addTo(this.map);
          marker.bindPopup("<div class='black-popup' style='color:black'>"+this.userInfo.firstName+" "+this.userInfo.lastName+"<br>"+this.userInfo.address+"</div>");
  
          marker.on('mouseover', function (e) {
            marker.openPopup();
          });
  
          marker.on('mouseout', function (e) {
            marker.closePopup();
          });
          
        }
      }
  }

 
  

  

}



