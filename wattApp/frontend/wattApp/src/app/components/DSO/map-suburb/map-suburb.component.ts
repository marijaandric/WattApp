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
    this.map = L.map('map1').setView([44.01761719631536, 20.900995763392213], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Create a layer for the suburb and add it to the map
    this.suburbLayer = L.geoJSON().addTo(this.map);

    // Set the style of the suburb layer
    const circle = L.circle([44.01761719631536, 20.900995763392213], {
      color: 'rgb(217, 3, 114)',
      fillColor: 'rgb(217, 3, 114)',
      fillOpacity: 0.5,
      radius: 550 // in meters
    }).addTo(this.map);

    const circle2 = L.circle([44.03513118202925, 20.88388325543175], {
      color: 'rgb(4, 167, 119)',
      fillColor: 'rgb(4, 167, 119)',
      fillOpacity: 0.5,
      radius: 500 // in meters
    }).addTo(this.map);

    const circle3 = L.circle([44.00064718648994, 20.861433826196794], {
      color: '#F75C03',
      fillColor: '#F75C03',
      fillOpacity: 0.5,
      radius: 600 // in meters
    }).addTo(this.map);

    // Bind a popup to the circle
    circle.bindPopup("<div class='popup'><p style='color:black'>The highest consumption <br>Stanovo</p></div>");
    circle2.bindPopup("<div class='popup'><p style='color:black'>The largest production! <br>Vinogradi</p></div>");
    circle3.bindPopup("<div class='popup'><p style='color:black'>The largest production! <br>Pcelice</p></div>");

    // Show and hide the popups on hover
    circle.on('mouseover', (e: L.LeafletMouseEvent) => {
      circle.openPopup();
    });
    circle.on('mouseout', (e: L.LeafletMouseEvent) => {
      circle.closePopup();
    });
    circle2.on('mouseover', (e: L.LeafletMouseEvent) => {
      circle2.openPopup();
    });
    circle2.on('mouseout', (e: L.LeafletMouseEvent) => {
      circle2.closePopup();
    });
    circle3.on('mouseover', (e: L.LeafletMouseEvent) => {
      circle3.openPopup();
    });
    circle3.on('mouseout', (e: L.LeafletMouseEvent) => {
      circle3.closePopup();
    });
    
  }
}
