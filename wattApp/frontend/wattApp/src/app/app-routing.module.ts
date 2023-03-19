import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/global/login-page-components/login/login.component';
import { NavbarComponent } from './components/global/landing-page-componenets/navbar/navbar.component';
import { LandingPageComponent } from './components/global/landing-page-componenets/landing-page/landing-page.component';
import { UsersComponent } from './components/DSO/users-page-components/users/users.component';
import { HomeComponent } from './components/global/home-page-components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserProfileComponent } from './components/global/user-profile/user-profile/user-profile.component';
import { ProsumerhomeComponent } from './components/Prosumer/home-page-components/prosumerhome/prosumerhome.component';
import { ContactComponent } from './components/global/contact/contact.component';
import { DeviceComponent } from './components/Prosumer/device/device.component';
import { DevicesComponent } from './components/Prosumer/devices-page-components/devices/devices.component';
import { DevicesProductionComponent } from './components/Prosumer/devices-page-components/devices-production/devices-production.component';
import { DevicesConsumptionComponent } from './components/Prosumer/devices-page-components/devices-consumption/devices-consumption.component';
import { DevicesStockComponent } from './components/Prosumer/devices-page-components/devices-stock/devices-stock.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent, pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  //{ path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'users', component: UsersComponent },
  { path: 'user', component:UserProfileComponent},
  { path: 'prosumerhome', component: ProsumerhomeComponent },
  { path:'contact', component:ContactComponent},
  { path: 'device', component: DeviceComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'devices/production', component: DevicesProductionComponent },
  { path: 'devices/consumption', component: DevicesConsumptionComponent },
  { path: 'devices/stock', component: DevicesStockComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

