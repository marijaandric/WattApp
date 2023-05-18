import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import axios from 'axios';
import * as L from 'leaflet';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-map-for-user-profile',
  templateUrl: './map-for-user-profile.component.html',
  styleUrls: ['./map-for-user-profile.component.css']
})
export class MapForUserProfileComponent implements OnInit{
  map!:any;
  marker!:any;
  @Input() address! : string;
  @Output() messageEvent = new EventEmitter<any>();
  message = {
    lat:0,
    lon:0,
    address:null as any,
    district: null as any
  }
  
  all! : {
    formattedAddress: any;
    locality: any;
  };

  markerIcon = L.icon({
    iconUrl: '/assets/icons/images/marker-pink.png',
    iconRetinaUrl: '/assets/icons/images/marker-pink.png',
    iconSize: [50, 50],
    iconAnchor: [25,55],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28]
  });

  constructor(private toast:NgToastService, private http:HttpClient)
  {

  }

  
  async ngOnInit(): Promise<void> {
    this.map = L.map('EditMapa').setView([44.01761719631536, 20.900995763392213], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    
    // Add a click event listener to the map
      this.map.on('click', async (event: { latlng: { lat: any; lng: any; }; }) => {
        // Get the clicked coordinates
        const lat = event.latlng.lat;
        const lng = event.latlng.lng;
        if(this.marker)
        {
          // Update the marker's position
          this.marker.setLatLng([lat, lng]);

          // Emit an event with the new coordinates
          this.message.lat = lat;
          this.message.lon = lng;
          this.all = await this.getAddressFromCoordinates2(this.message.lat,this.message.lon)
          this.message.address = this.all.formattedAddress;
          const res = await this.getArea(lat,lng);
        
          if(res.district === undefined)
          {
            this.message.district = res.city
          }
          else{
            this.message.district = res.district + ", " + res.city
          }
          this.messageEvent.emit(this.message);
        }
        else{
          this.marker = L.marker([lat, lng], {icon:this.markerIcon}).addTo(this.map);
          // Emit an event with the new coordinates
          this.message.lat = lat;
          this.message.lon = lng;
          this.all = await this.getAddressFromCoordinates2(this.message.lat,this.message.lon)
          this.message.address = this.all.formattedAddress;
          const res = await this.getArea(lat,lng);
        
          if(res.district === undefined)
          {
            this.message.district = res.city
          }
          else{
            this.message.district = res.district + ", " + res.city
          }
          this.messageEvent.emit(this.message);
        }

        
      });
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if(changes['address'])
    {
      this.address = changes['address'].currentValue;
      if(this.address != "" && this.address != undefined)
      {
        this.address += ", Serbia"
        const apiKey = 'AumQQtxIWQ1XOGigIU7OkM9IVZB9KpZ9Q6nXeNAvf1c5ctZuidAHJ4zXqvjIeedr'; 
    
        const url = 'https://dev.virtualearth.net/REST/v1/Locations';
        const params = {
          q: this.address,
          key: apiKey,
        };
      try {
        const response = await axios.get(url, { params });
        const coordinates = response.data.resourceSets[0].resources[0].point.coordinates;
        const lat = coordinates[0];
        const lon = coordinates[1];
        console.log(response.data)
        if (this.marker) {
          // If a marker already exists, update its position
          this.marker.setLatLng([lat, lon]);
        } else {
          // Otherwise, create a new marker
          this.marker = L.marker([lat, lon], { icon: this.markerIcon }).addTo(this.map);
        }

        this.message.lat = lat;
        this.message.lon = lon;
        this.all = await this.getAddressFromCoordinates2(this.message.lat, this.message.lon);
        this.message.address = this.all.formattedAddress;
        const res = await this.getArea(lat,lon);
        
          if(res.district === undefined)
          {
            this.message.district = res.city
          }
          else{
            this.message.district = res.district + ", " + res.city
          }
        this.messageEvent.emit(this.message);
      } catch (error) {
        if (this.address !== undefined) {
          this.toast.error({ detail: 'Error', summary: 'Wrong address', duration: 4000 });
        }
      }
    }
  }
}
  
  async getAddressFromCoordinates2(lat: number, lon: number): Promise<any> {
    const apiKey = 'AumQQtxIWQ1XOGigIU7OkM9IVZB9KpZ9Q6nXeNAvf1c5ctZuidAHJ4zXqvjIeedr'; 
    
    const url = `https://dev.virtualearth.net/REST/v1/Locations/${lat},${lon}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.resourceSets && data.resourceSets.length > 0 && data.resourceSets[0].resources && data.resourceSets[0].resources.length > 0) {
      this.all = {
          formattedAddress: data.resourceSets[0].resources[0].address.formattedAddress,
          locality: data.resourceSets[0].resources[0].address.locality,
        }
      return this.all;
    } else {
      this.toast.error({detail:"Error",summary:"Wrong coordinates",duration:4000});
    }
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}

  async getArea(lat: number, lon: number): Promise<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`;
    try {
      const response = await axios.get(url);
      
      let result = {district:response.data.address.city_district, city:response.data.address.city};
      if(result.district == undefined || result.district == null || result.district == "Крагујевац")
      {
        result = {district:response.data.address.suburb, city:response.data.address.city};
      }
      return result;
    } catch (error) {
      throw new Error(`Greška pri dobijanju područja: ${error}`);
    }
  }
}

