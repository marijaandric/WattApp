import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/global/login-page-components/login/login.component';
import { NavbarComponent } from './components/global/landing-page-componenets/navbar/navbar.component';
import { LandingPageComponent } from './components/global/landing-page-componenets/landing-page/landing-page.component';
import { UsersComponent } from './components/dso/users-page-components/users/users.component';
import { HomeComponent } from './components/global/home-page-components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ProsumerhomeComponent } from './components/prosumer/home-page-components/prosumerhome/prosumerhome.component';
import { DeviceComponent } from './components/Prosumer/device/device.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent, pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  //{ path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'users', component: UsersComponent },
  { path: 'prosumerhome', component: ProsumerhomeComponent },
  {path: 'device', component: DeviceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

