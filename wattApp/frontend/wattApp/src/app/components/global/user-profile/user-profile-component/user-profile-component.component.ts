import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-user-profile-component',
  templateUrl: './user-profile-component.component.html',
  styleUrls: ['./user-profile-component.component.css']
})
export class UserProfileComponentComponent implements OnInit{

  ngOnInit(): void {
    const map = L.map('map').setView([44.007247, 20.904429], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([44.007247, 20.904429]).addTo(map);
    marker.bindPopup("<div class='black-popup' style='color:black'>Hello world!<br>I am a popup.</div>");
    
    marker.on('mouseover', function (e) {
      marker.openPopup();
    });
    
    marker.on('mouseout', function (e) {
      marker.closePopup();
    });
  }
}


