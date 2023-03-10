import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/global/login/login.component';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { LandingPageComponent } from './components/global/landing-page/landing-page.component';
import { UsersComponent } from './components/dso/users/users.component';
import { HomeComponent } from './components/global/home/home.component';
import { StadardTemplateComponent } from './components/global/stadard-template/stadard-template.component';
import { DsoSidebarComponent } from './components/dso/dso-sidebar/dso-sidebar.component';
import { ProsumerSidebarComponent } from './components/prosumer/prosumer-sidebar/prosumer-sidebar.component';

//export const url = 'https://localhost:7194/api/User/';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    LandingPageComponent,
    UsersComponent,
    HomeComponent,
    StadardTemplateComponent,
    DsoSidebarComponent,
    ProsumerSidebarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
