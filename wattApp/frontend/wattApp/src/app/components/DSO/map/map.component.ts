import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import axios from 'axios';
import * as L from 'leaflet';
import { UserDTO } from 'src/app/dtos/UserDTO';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges{
  @Input() users! : UserDTO[];
  lan! : number;
  lon! : number;
  area! : string;
  map! : any;

  constructor(private http: HttpClient){
    
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([44.007247, 20.904429], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    this.mapa()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['users'])
    {
      this.users = changes['users'].currentValue;
      this.mapa()
    }
  }

  async mapa()
  {
    const markerIcon = L.icon({
      iconUrl: '/assets/icons/images/marker-green.png',
      iconRetinaUrl: '/assets/icons/images/marker-green.png',
      iconSize: [50, 50],
      iconAnchor: [2, 11],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowUrl: '/assets/icons/images/marker-shadow.png',
      shadowSize: [60, 60],
      shadowAnchor: [0, 15]
    });

    if(this.users != null)
    {
      for(let i=0;i<this.users.length;i++)
      {
        const location = this.users[i].address
        const lan = this.users[i].x;
        const lon = this.users[i].y
        if (lan != undefined && lon != undefined) {
          const marker = L.marker([lan, lon], {icon : markerIcon}).addTo(this.map);
          marker.bindPopup("<div class='black-popup' style='color:black'>"+this.users[i].firstName+" "+this.users[i].lastName+"<br>"+this.users[i].address+"</div>");
  
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
}
