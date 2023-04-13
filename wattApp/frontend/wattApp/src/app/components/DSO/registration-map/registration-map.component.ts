import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import axios from 'axios';
import * as L from 'leaflet';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-map',
  templateUrl: './registration-map.component.html',
  styleUrls: ['./registration-map.component.css']
})
export class RegistrationMapComponent implements OnInit{
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
  
  all = {address : "", result:""}

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
    this.map = L.map('mapa').setView([44.01761719631536, 20.900995763392213], 13);
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
          this.message.address = this.all.address;
          this.message.district = this.all.result;
          if(this.message.district === undefined)
          {
            this.message.district = "Grad Kragujevac"
          }
          this.messageEvent.emit(this.message);
        }
        else{
          this.marker = L.marker([lat, lng], {icon:this.markerIcon}).addTo(this.map);
          // Emit an event with the new coordinates
          this.message.lat = lat;
          this.message.lon = lng;
          this.all = await this.getAddressFromCoordinates2(this.message.lat,this.message.lon)
          this.message.address = this.all.address;
          this.message.district = this.all.result;
          if(this.message.district === undefined)
          {
            this.message.district = "Grad Kragujevac"
          }
          this.messageEvent.emit(this.message);
        }

        
      });
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if(changes['address'])
    {
      this.address = changes['address'].currentValue;
      if(this.address != "")
      {
        const url = 'https://nominatim.openstreetmap.org/search'
        const params = {
          q: this.address,
          format: 'json'
        };
        try {
          const response = await axios.get(url, { params });
          const lat = response.data[0].lat
          const lon =  response.data[0].lon;
          if (this.marker) {
            // If a marker already exists, update its position
            this.marker.setLatLng([lat, lon]);
          } else {
            // Otherwise, create a new marker
            this.marker = L.marker([lat, lon], {icon:this.markerIcon}).addTo(this.map);
          }
          
          this.message.lat = lat;
          this.message.lon = lon;
          this.all = await this.getAddressFromCoordinates2(this.message.lat,this.message.lon)
          this.message.address = this.all.address;
          this.message.district = this.all.result;
          if(this.message.district === undefined)
          {
            this.message.district = "Grad Kragujevac"
          }
          this.messageEvent.emit(this.message)
        } catch (error) {
          if(this.address != undefined)
          {
            this.toast.error({detail:"Error",summary:"Wrong address",duration:4000});
          }
          
        }
      }
    }
  }

  async getAddressFromCoordinates2(lat: number, lon: number): Promise<{address: string, result: string}> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`;
    return this.http.get(url).toPromise().then((response: any) => {
      const address = response.address;
      const result = response.address.suburb;
      let fullAddress = `${address.road}, ${address.city}`;

      if(address.house_number != undefined)
      {
        fullAddress = `${address.road} ${address.house_number}, ${address.city}`;
      }
      else{
        this.toast.warning({detail:"Warning",summary:"Please, enter your building number!",duration:4000});
      }

      if(address.city != "Град Крагујевац")
      {
        this.toast.warning({detail:"Warning",summary:"Please, choose a location that belongs to Kragujevac!",duration:4000});
      }

      return {address: fullAddress, result: result};
    });
  }

}

