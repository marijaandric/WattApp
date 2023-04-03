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

  constructor(private http: HttpClient)
  {

  }

  ngOnInit(): void {
    this.mapa()
    this.map = L.map('map').setView([44.007247, 20.904429], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['users'])
    {
      this.users = changes['users'].currentValue;
      this.mapa()
    }
  }


  async getCoordinates(location: string) {
    const url = 'https://nominatim.openstreetmap.org/search'
    const params = {
      q: location,
      format: 'json'
    };
    const response = await axios.get(url, { params })
    return [response.data[0].lat, response.data[0].lon]
  }

  getDistrict(lat : number, lon: number)
    {
      {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
          return this.http.get(url).toPromise()
          .then((data: any) => {
            if (data && data.address && data.address.city_district) {
              return data.address.suburb;
            } else {
              return null;
            }
          })
          .catch((error: any) => {
            console.log(error);
            return null;
          });
      }
    }

  async mapa()
  {
    const markerIcon = L.icon({
      iconUrl: '/assets/icons/images/marker-icon.png',
      iconRetinaUrl: '/assets/icons/images/marker-icon-2x.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowUrl: '/assets/icons/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });

    if(this.users != null)
    {
      for(let i=0;i<this.users.length;i++)
      {
        const location = this.users[i].address
        const [lan, lon] = await this.getCoordinates(location)
        console.log(await this.getDistrict(lan,lon))
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
