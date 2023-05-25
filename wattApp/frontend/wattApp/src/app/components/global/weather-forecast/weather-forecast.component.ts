import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  hostElement: HTMLElement | undefined;
  WeatherData:any;
  icon : string = "fa fa-sun";
  currentDate : Date = new Date;
  time : string = this.currentDate.toLocaleTimeString();
  date : string = this.currentDate.toLocaleDateString();
  lightMode:Boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private userService:UserService ) {

  }

  
  async ngOnInit(): Promise<void> {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const mapa = this.hostElement?.querySelector('.box');
    const tekst = this.hostElement?.querySelectorAll('.box .info h2, p, .info2 h4');
    const mini_tekst = this.hostElement?.querySelectorAll('.box .info .info2 h6');
    const waves = this.hostElement?.querySelectorAll('.wave');
    
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = dark;
      if(this.lightMode == true)
      {
        this.renderer.removeClass(mapa, 'light-theme-background-white');
        this.renderer.addClass(mapa, 'dark-theme-background-gray-gradient-1');
        
        this.renderer.removeClass(mapa, 'light-theme-bigger-shadow');
        this.renderer.addClass(mapa, 'dark-theme-bigger-shadow');
        
        
        mini_tekst.forEach((innerElement) => {
          this.renderer.removeClass(innerElement, 'light-theme-text-color-dark-gray');
        });
        waves.forEach((wave) => {
          this.renderer.removeClass(wave,'light-theme-bg-blue');
        });
        tekst.forEach((innerElement) => {
          this.renderer.removeClass(innerElement, 'light-theme-text-color-dark-gray');
        });

        
      } else {
        this.renderer.addClass(mapa, 'light-theme-bigger-shadow');
        this.renderer.addClass(mapa, 'light-theme-background-white');


        //sklanjaju se klase za dark
        this.renderer.removeClass(mapa, 'dark-theme-bigger-shadow');
        this.renderer.addClass(mapa, 'dark-theme-background-gray-gradient-1');
        mini_tekst.forEach((innerElement) => {
          this.renderer.addClass(innerElement, 'light-theme-text-color-dark-gray');
        });
        waves.forEach((wave) => {
          this.renderer.addClass(wave,'light-theme-bg-blue');
        });
        tekst.forEach((innerElement) => {
          this.renderer.addClass(innerElement, 'light-theme-text-color-dark-gray');
        });

        //      postavljaju se klase za light
       
        
        mini_tekst.forEach((innerElement) => {
          this.renderer.addClass(innerElement, 'light-theme-text-color-dark-gray');
        });
        waves.forEach((wave) => {
          this.renderer.addClass(wave,'light-theme-bg-blue');
        });
        tekst.forEach((innerElement) => {
          this.renderer.addClass(innerElement, 'light-theme-text-color-dark-gray');
        });

      }
     
      


      this.hostElement?.classList.toggle('dark-theme-bigger-shadow', dark);
      this.hostElement?.classList.toggle('light-theme-bigger-shadow', !dark);
      this.hostElement?.classList.toggle('dark-theme-background-gray-gradient-1', dark);
      this.hostElement?.classList.toggle('light-theme-background-white', !dark);
    });


    
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();

    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
      this.date = new Date().toLocaleDateString();

      const currentHour = new Date().getHours();

      if (currentHour >= 6 && currentHour < 18) {
        this.icon = "fa fa-sun";
      } else {
        this.icon = "fa fa-moon-o";
      }

    },1000);
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=kragujevac&appid=ff1bc4683fc7325e9c57e586c20cc03e')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
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
