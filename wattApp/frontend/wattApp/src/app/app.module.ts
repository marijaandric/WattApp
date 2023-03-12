import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/global/login-page-components/login/login.component';
import { NavbarComponent } from './components/global/landing-page-componenets/navbar/navbar.component';
import { LandingPageComponent } from './components/global/landing-page-componenets/landing-page/landing-page.component';
import { UsersComponent } from './components/dso/users-page-components/users/users.component';
import { HomeComponent } from './components/global/home-page-components/home/home.component';
import { StadardTemplateComponent } from './components/global/layout-components/standard-template/stadard-template.component';
import { LandingPageFooterComponent } from './components/global/landing-page-componenets/landing-page-footer/landing-page-footer.component';
import { LandingPageTeamComponent } from './components/global/landing-page-componenets/landing-page-team/landing-page-team.component';
import { TitleBarComponent } from './components/global/layout-components/title-bar/title-bar.component';
import { SidebarComponent } from './components/global/layout-components/side-bar/sidebar.component';
import { CenterBarComponent } from './components/global/layout-components/center-bar/center-bar.component';
import { InfoBarComponent } from './components/global/layout-components/info-bar/info-bar.component';
import { SelectOneMenuBarComponent } from './components/global/layout-components/select-one-menu-bar/select-one-menu-bar.component';

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
    LandingPageFooterComponent,
    LandingPageTeamComponent,
    TitleBarComponent,
    SidebarComponent,
    CenterBarComponent,
    InfoBarComponent,
    SelectOneMenuBarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }