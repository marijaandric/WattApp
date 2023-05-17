import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import * as L from 'leaflet';
import { UserDTO } from 'src/app/dtos/UserDTO';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile-component',
  templateUrl: './user-profile-component.component.html',
  styleUrls: ['./user-profile-component.component.css']
})
export class UserProfileComponentComponent implements OnInit,OnChanges{
  map: any;
  user : any;
  private darkLayer!: L.TileLayer;
  private lightLayer!: L.TileLayer;

  constructor(private userService: UserService)
  {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    const token = localStorage.getItem('token');
    
    if(token)
    {
      const userId = this.userService.getUserIdFromToken(token);
      this.userService.GetUserWithoutToken(userId).toPromise()
      .then(data=>{
        this.user = data;
      });
    }
  }

  async ngOnInit()
  {
    const token = localStorage.getItem('token');
    
    if(token)
    {
      const userId = this.userService.getUserIdFromToken(token);
      await this.userService.GetUserWithoutToken(userId).toPromise()
      .then(data=>{
        this.user = data;
      });
    }
    this.map = L.map('userMap').setView([44.01761719631536, 20.900995763392213], 12);
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

    if(this.user != null)
    {
        const lan = this.user.x;
        const lon = this.user.y
        const id = this.user.id
        this.map.setView([lan, lon], 14);
        if (lan != undefined && lon != undefined) {
          const marker = L.marker([lan, lon], {icon : markerIcon}).addTo(this.map);
          marker.bindPopup("<div class='black-popup' style='color:black'>"+this.user.firstName+" "+this.user.lastName+"<br>"+this.user.address+"</div>");
  
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


