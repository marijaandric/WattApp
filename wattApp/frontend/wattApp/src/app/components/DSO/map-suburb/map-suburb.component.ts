import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { AreasService } from 'src/app/services/areas/areas.service';
import { UserService } from 'src/app/services/user/user.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-map-suburb',
  templateUrl: './map-suburb.component.html',
  styleUrls: ['./map-suburb.component.css']
})
export class MapSuburbComponent implements OnInit,OnChanges {
  hostElement: HTMLElement | undefined;
 lightMode: Boolean = true;
  @Input() type : City = {name: 'Consumption', code: 'Consumer'};
  @Input() date : City= {name: 'Week', code: 'Week'};
  map: any;
  suburbLayer: any;
  highestCoordinates!:any;
  lowestCoordinates!:any;
  prom!:any;
  data: any;
  private darkLayer!: L.TileLayer;
  private lightLayer!: L.TileLayer;
  circle!: L.Circle;
  circle2!: L.Circle;
  usageMin:any;
  usageMax:any;

  constructor(private areaService:AreasService,private http:HttpClient,private userService: UserService, private elementRef: ElementRef, private renderer: Renderer2){}

  ngOnChanges(changes: SimpleChanges): void {
    if ('type' in changes) {
      this.type = this.type;
      this.create();
    }
    if ('date' in changes) {
      this.date = this.date;
      this.create();
    }


  }

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
      this.prom = this.areaService.getExtremeUsageForAreas(this.type.code, this.date.code, maxmin).subscribe(async (data) => {
        
        if(maxmin=="Max")
        {
          this.usageMax = data.usage.toFixed(2);
          this.highestCoordinates = await this.getCoordinates(data.area);
        }
        else{
          this.usageMin = data.usage.toFixed(2);
          this.lowestCoordinates = await this.getCoordinates(data.area);
        }
        resolve();
      });
    });
  }

  async ngOnInit(): Promise<void> {
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.hostElement = this.elementRef.nativeElement as HTMLElement;
      this.lightMode = !dark
      /*
      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
    */
    });

    this.map = L.map('map1').setView([44.01761719631536, 20.900995763392213], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
    this.create();

    
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const main_text = this.hostElement?.querySelector(".map");
    this.renderer.addClass(main_text, '');
    const h5text = this.hostElement?.querySelector("h5");
    this.renderer.addClass(h5text, '');
  }

  async create()
  {
    this.darkLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', { //https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
      attribution: '&copy; OpenStreetMap contributors'
    });
    this.lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });

    await this.getAreas("Max");

    this.suburbLayer = L.geoJSON().addTo(this.map);

    if(this.circle == null || this.circle == undefined)
    {
      this.circle = L.circle([this.highestCoordinates[0],this.highestCoordinates[1]], {
        color: '#eb4886',
        fillColor: '#eb4886',
        fillOpacity: 0.5,
        radius: 550 // in meters
      }).addTo(this.map);
  
  
      await this.getAreas("Min");
      this.circle2 = L.circle([this.lowestCoordinates[0],this.lowestCoordinates[1]], {
        color: '#46c5f1',
        fillColor: '#46c5f1',
        fillOpacity: 0.5,
        radius: 500 // in meters
      }).addTo(this.map);
  
      let radius = this.circle.getRadius();
      let expanding = true;
      setInterval(() => {
        if (expanding) {
          radius += 40;
        } else {
          radius -= 40;
        }
        
        this.circle.setRadius(radius);
        this.circle2.setRadius(radius)
        
        if (radius >= 800) {
          expanding = false;
        } else if (radius <= 550) {
          expanding = true;
        }
      }, 150);
  
  
      if(this.highestCoordinates[2] != this.lowestCoordinates[2])
      {
        // Bind a popup to the circle
        this.circle.bindPopup("<div class='popup'><p style='color:black'>The highest "+this.type.name+" - "+this.highestCoordinates[2]+"</p><br><h4 style='color:black'>Usage : "+this.usageMax+" kWh</h4></div>");
        this.circle2.bindPopup("<div class='popup'><p style='color:black'>The lowest "+this.type.name+" - "+this.lowestCoordinates[2]+"</p><br><h4 style='color:black'>Usage : "+this.usageMin+" kWh</h4></div>");
      }
      else{
        this.circle.bindPopup("<div class='popup'><p style='color:black'>The highest and lowest "+this.type.name+" - "+this.highestCoordinates[2]+"</p><br></div>");
        this.circle2.bindPopup("<div class='popup'><p style='color:black'>The highest and lowest "+this.type.name+" - "+this.lowestCoordinates[2]+"</p><br></div>");

      }

      // Show and hide the popups on hover
      this.circle.on('mouseover', (e: L.LeafletMouseEvent) => {
        this.circle.openPopup();
      });
      this.circle.on('mouseout', (e: L.LeafletMouseEvent) => {
        this.circle.closePopup();
      });
      this.circle2.on('mouseover', (e: L.LeafletMouseEvent) => {
        this.circle2.openPopup();
      });
      this.circle2.on('mouseout', (e: L.LeafletMouseEvent) => {
        this.circle2.closePopup();
      });
    }
    else{
      await this.getAreas("Max");
      this.circle.setLatLng([this.highestCoordinates[0],this.highestCoordinates[1]]);
      // this.circle.bindPopup("<div class='popup'><p style='color:black'>The highest "+this.type.name+" - "+this.highestCoordinates[2]+"</p><br><h4 style='color:black'>Usage : "+this.usageMax+" kWh</h4></div>");
      await this.getAreas("Min");
      this.circle2.setLatLng([this.lowestCoordinates[0],this.lowestCoordinates[1]]);
      // this.circle2.bindPopup("<div class='popup'><p style='color:black'>The lowest "+this.type.name+" - "+this.lowestCoordinates[2]+"</p><br><h4 style='color:black'>Usage : "+this.usageMin+" kWh</h4></div>");
      
      if(this.highestCoordinates[2] != this.lowestCoordinates[2])
      {
        // Bind a popup to the circle
        this.circle.bindPopup("<div class='popup'><p style='color:black'>The highest "+this.type.name+" - "+this.highestCoordinates[2]+"</p><br><h4 style='color:black'>Usage : "+this.usageMax+" kWh</h4></div>");
        this.circle2.bindPopup("<div class='popup'><p style='color:black'>The lowest "+this.type.name+" - "+this.lowestCoordinates[2]+"</p><br><h4 style='color:black'>Usage : "+this.usageMin+" kWh</h4></div>");
      }
      else{
        this.circle.bindPopup("<div class='popup'><p style='color:black'>The highest and lowest "+this.type.name+" - "+this.highestCoordinates[2]+"</p><br></div>");
        this.circle2.bindPopup("<div class='popup'><p style='color:black'>The highest and lowest "+this.type.name+" - "+this.lowestCoordinates[2]+"</p><br></div>");
      }
    }
    
    
  }

  toggleDarkMode(): void {
    if (this.map.hasLayer(this.darkLayer)) {
      // if the dark layer is already active, switch to light
      this.map.removeLayer(this.darkLayer);
      this.lightLayer.addTo(this.map);
    } else {
      // if the light layer is active, switch to dark
      this.map.removeLayer(this.lightLayer);
      this.darkLayer.addTo(this.map);
    }
  }
}
