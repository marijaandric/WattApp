import { Component } from '@angular/core';
import { LoginComponent } from './components/global/login/login.component';
import { NavbarComponent } from './components/global/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CodeSpark Energy';
}
