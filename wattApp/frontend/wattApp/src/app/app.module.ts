import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/global/login/login.component';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { LandingPageComponent } from './components/global/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';

//export const url = 'https://localhost:7194/api/User/';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
