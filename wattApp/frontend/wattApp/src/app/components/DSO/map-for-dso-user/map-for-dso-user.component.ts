import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import axios from 'axios';
import * as L from 'leaflet';
import { UserDTO } from 'src/app/dtos/UserDTO';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-map-for-dso-user',
  templateUrl: './map-for-dso-user.component.html',
  styleUrls: ['./map-for-dso-user.component.scss']
})
export class MapForDsoUserComponent implements OnInit, OnChanges{
  lightMode: Boolean = true;
  @Input() user : any;
  lan! : number;
  lon! : number;
  area! : string;
  map! : L.Map;

  private darkLayer!: L.TileLayer;
  private lightLayer!: L.TileLayer;

  constructor(private http: HttpClient, private userService: UserService){
    
  }

 
  async ngOnInit(): Promise<void> {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
     
    });
    this.map = L.map('map4').setView([44.007247, 20.904429], 12.6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(this.map);
    this.darkLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', { //https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
      attribution: ''
    });
    this.lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    });
    this.mapa()

    //this.mapa()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['user'])
    {
      this.user = changes['user'].currentValue;
      this.mapa()
    }
  }

  async mapa()
  {
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

          marker.on('click', function (e) {
            window.open(`/userDSO/`+id);
          });
          
        }
      }
    }
    
  }
