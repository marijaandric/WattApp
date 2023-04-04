import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import axios from 'axios';
import * as L from 'leaflet';

@Component({
  selector: 'app-registration-map',
  templateUrl: './registration-map.component.html',
  styleUrls: ['./registration-map.component.css']
})
export class RegistrationMapComponent implements OnInit{
  map!:any;
  @Input() address! : string;

  markerIcon = L.icon({
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

  ngOnInit(): void {
    this.map = L.map('mapa').setView([44.01761719631536, 20.900995763392213], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
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
          const marker = L.marker([lat, lon], {icon:this.markerIcon}).addTo(this.map);

          this.map.on('click', (event: L.LeafletMouseEvent) => {
            const latlng = event.latlng;
            marker.setLatLng(latlng);
            console.log(latlng.lat, latlng.lng);
          });
        } catch (error) {
          console.error("GRESKA");
        }
      }
    }
   
    
  }

}
