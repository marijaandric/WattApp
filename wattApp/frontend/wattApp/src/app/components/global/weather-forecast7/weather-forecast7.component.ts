import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-forecast7',
  templateUrl: './weather-forecast7.component.html',
  styleUrls: ['./weather-forecast7.component.css']
})

export class WeatherForecast7Component implements OnInit{
  private apiKey = '1702d844857d1ce89239d1c1a641dd84';
  weatherData: any;

  constructor() {
  }
  ngOnInit(): void {
    this.getWeatherForecast(37.7749,-122.4194).subscribe(data=>{
      this.weatherData = data.list;
      console.log(this.weatherData)
    })
  }

  getWeatherForecast(lat: number, lon: number): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial&exclude=hourly,minutely,current,alerts`;
    return new Observable(observer => {
      axios.get(url).then(response => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  

  
}
