import { Component } from '@angular/core';
import { LoginComponent } from './components/global/login/login.component';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { LandingPageComponent } from './components/global/landing-page/landing-page.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'DSO';

}
