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
  WeatherData:any;
  filterWeatherData :any= [];
  currentDate : Date = new Date;
  time : string = this.currentDate.toLocaleTimeString();
  date : string = this.currentDate.toLocaleDateString();

  constructor() {
    this.getWeatherForecast(44.01860475758608,20.907175572741636).subscribe(data=>{
      this.futureForecast(data.list)
      this.weatherData = this.filterWeatherData;
    })
  }
  ngOnInit(): void {
    
    this.getWeatherData();
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
      this.date = new Date().toLocaleDateString();

      const currentHour = new Date().getHours();
    },1000);

  }

  getWeatherForecast(lat: number, lon: number): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`;
    return new Observable(observer => {
      axios.get(url).then(response => {
        observer.next(response.data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  futureForecast(data:any)
  {
    console.log(data)
    let brojac = 0;
    for(let i = 0; i< 40; i= i+8)
    {
      this.filterWeatherData.push( data[i] );
      this.filterWeatherData[brojac].dt_txt = data[i].dt_txt.split(' ')[0]
      for(let j = i;j< i + 8;j=j+1)
      {
        if(this.filterWeatherData[brojac].main.temp_max < data[j].main.temp_max)
        {
          this.filterWeatherData[brojac].main.temp_max = data[j].main.temp_max
        }
        if(this.filterWeatherData[brojac].main.temp_min > data[j].main.temp_min)
        {
          this.filterWeatherData[brojac].main.temp_min = data[j].main.temp_min
        }
      }
      brojac=brojac+1;
    }
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=kragujevac&appid=ff1bc4683fc7325e9c57e586c20cc03e')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }
  setWeatherData(data:any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);

  }
  
}
