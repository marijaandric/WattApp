import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { AreasService } from 'src/app/services/areas/areas.service';

@Component({
  selector: 'app-map-suburb',
  templateUrl: './map-suburb.component.html',
  styleUrls: ['./map-suburb.component.css']
})
export class MapSuburbComponent implements OnInit {
  map: any;
  suburbLayer: any;
  highestCoordinates!:any;
  lowestCoordinates!:any;
  prom!:any;
  data: any;

  constructor(private areaService:AreasService,private http:HttpClient){}

  async getCoordinates(district: string): Promise<[number, number,string] | undefined> {
    const params = {
      q: district,
      format: 'json',
      limit: '1'
    };
    try {
      const data = await this.http.get<any>('https://nominatim.openstreetmap.org/search.php', { params }).toPromise();
      if (data.length > 0) {
        const result = data[0];
        const latitude = parseFloat(result.lat);
        const longitude = parseFloat(result.lon);
        return [latitude, longitude,district];
      }
    } catch (err) {
      console.error(err);
    }
    return undefined;
  }
  
  async getAreas(maxmin:string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.prom = this.areaService.getExtremeUsageForAreas("Consumer", "Month", maxmin).subscribe(async (data) => {
        if(maxmin=="Max")
        {
          this.highestCoordinates = await this.getCoordinates(data.area);
        }
        else{
          this.lowestCoordinates = await this.getCoordinates(data.area);
        }
        resolve();
      });
    });
  }

async ngOnInit(): Promise<void> {
  this.map = L.map('map1').setView([44.01761719631536, 20.900995763392213], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    await this.getAreas("Max");

    // Create a layer for the suburb and add it to the map
    this.suburbLayer = L.geoJSON().addTo(this.map);

    // Set the style of the suburb layer
    const circle = L.circle([this.highestCoordinates[0],this.highestCoordinates[1]], {
      color: 'rgb(217, 3, 114)',
      fillColor: 'rgb(217, 3, 114)',
      fillOpacity: 0.5,
      radius: 550 // in meters
    }).addTo(this.map);


    let radius = circle.getRadius();
    let expanding = true;

    await this.getAreas("Min");
    const circle2 = L.circle([this.lowestCoordinates[0],this.lowestCoordinates[1]], {
      color: 'rgb(4, 167, 119)',
      fillColor: 'rgb(4, 167, 119)',
      fillOpacity: 0.5,
      radius: 500 // in meters
    }).addTo(this.map);

    /* ako se odlucimo da kruzici ne budu staticni
    setInterval(() => {
      if (expanding) {
        radius += 50;
      } else {
        radius -= 50;
      }
      
      circle.setRadius(radius);
      circle2.setRadius(radius)
      
      if (radius >= 800) {
        expanding = false;
      } else if (radius <= 550) {
        expanding = true;
      }
    }, 150);*/


    // Bind a popup to the circle
    circle.bindPopup("<div class='popup'><p style='color:black'>The highest consumption - "+this.highestCoordinates[2]+"</p></div>");
    circle2.bindPopup("<div class='popup'><p style='color:black'>The largest production - "+this.lowestCoordinates[2]+"</p></div>");

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
    
  }
}
