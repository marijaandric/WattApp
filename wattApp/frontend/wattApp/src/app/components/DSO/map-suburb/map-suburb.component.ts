import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-suburb',
  templateUrl: './map-suburb.component.html',
  styleUrls: ['./map-suburb.component.css']
})
export class MapSuburbComponent implements OnInit {
  map: any;
  suburbLayer: any;

  ngOnInit(): void {
    // Set the coordinates of the suburb you want to display
    // Create the map using Leaflet
    this.map = L.map('map1').setView([44.01761719631536, 20.900995763392213], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Create a layer for the suburb and add it to the map
    this.suburbLayer = L.geoJSON().addTo(this.map);

    // Set the style of the suburb layer
    const circle = L.circle([44.01761719631536, 20.900995763392213], {
      color: 'rgb(217, 3, 114)',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500 // in meters
    }).addTo(this.map);

    // Bind a popup to the circle
    circle.bindPopup('This is a red circle!');
  }
}
