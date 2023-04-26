import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import axios from 'axios';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { UserDTO } from 'src/app/dtos/UserDTO';
declare var $: any;
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

  private darkLayer!: L.TileLayer;
  private lightLayer!: L.TileLayer;

  constructor(private http: HttpClient){
    
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([44.007247, 20.904429], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      
    }).addTo(this.map);
    this.darkLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', { //https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
      attribution: '&copy; OpenStreetMap contributors'
    });
    this.lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });

    new LegendControl().addTo(this.map);
    
    this.mapa();
    const rightDiv = document.querySelector('.switch-right');
    const switchToggle = document.querySelector('.toggle-switch')as HTMLDivElement;;
    const switchDiv = document.querySelector('.switch-div')as HTMLDivElement;;
    
    rightDiv?.addEventListener('click', () => {
      if (switchToggle) {
        switchToggle.style.transform = 'translateX(60px)';
        switchToggle.style.background = 'linear-gradient(45deg, #46c5f1 10%, #5245b7 100%)';
      }
      if(switchDiv) {

        switchDiv.style.background = 'linear-gradient(180deg, #1e1e1e 50%, #121212 100%)';
      }
    });

    const leftDiv = document.querySelector('.switch-left');
    
    leftDiv?.addEventListener('click', () => {
      if (switchToggle) {
        switchToggle.style.transform = 'translateX(0px)';
        switchToggle.style.background = 'linear-gradient(180deg, #1e1e1e 50%, #121212 100%)';
      }
      if(switchDiv) {

        switchDiv.style.background = 'linear-gradient(45deg, #46c5f1 10%, #5245b7 100%)';
      }
    });
  }

  toggleLightMode(): void {
    this.map.removeLayer(this.darkLayer);
    this.lightLayer.addTo(this.map);
  }
  toggleDarkMode(): void {
      this.map.removeLayer(this.lightLayer);
      this.darkLayer.addTo(this.map);
    
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
      iconUrl: '/assets/icons/images/marker-pink.png',
      iconRetinaUrl: '/assets/icons/images/marker-pink.png',
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
        const id = this.users[i].id
        if (lan != undefined && lon != undefined) {
          const marker = L.marker([lan, lon], {icon : markerIcon}).addTo(this.map);
          marker.bindPopup("<div class='black-popup' style='color:black'>"+this.users[i].firstName+" "+this.users[i].lastName+"<br>"+this.users[i].address+"</div>");
  
          marker.on('mouseover', function (e) {
            marker.openPopup();
          });
  
          marker.on('mouseout', function (e) {
            marker.closePopup();
          });

          marker.on('click', function (e) {
            window.open(`/userDSO/`+id);
          });
        }
      }
    }
    
  }
}
const LegendControl = L.Control.extend({
  options: {
    position: 'topright'
  },

  onAdd: function (map: L.Map) {
    const div = L.DomUtil.create('div', 'info legend');
    // Add the legend HTML content here
    div.innerHTML = `
    <div style='
    background: #1e1e1e ;; box-shadow: 2px 2px 10px black;border-radius: 20px;padding:10px'>
      <h5 style=font-weight:bold; font-size:15px;>Legend</h5>
      <div>
        <span><img style='width:20px;height:auto;padding-top:10px;padding-bottom:10px;' src='/assets/icons/images/marker-red.png'>  </span>
        <span>A prosumer who consumes more than 200kwh per month</span>
      </div>
      <div>
      <span><img style='width:20px;height:auto;padding-bottom:10px;' src='/assets/icons/images/marker-pink.png'>  </span>
        <span>Average prosumer</span>
      </div>
      <div>
      <span><img style='width:20px;height:auto;padding-bottom:10px;' src='/assets/icons/images/marker-green.png'>  </span>
      <span>A prosumer who consumes less than 100kwh per month</span>
      </div>
      </div>
    `;
    return div;
  }
});