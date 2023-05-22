import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/global/login-page-components/login/login.component';
import { NavbarComponent } from './components/global/landing-page-componenets/navbar/navbar.component';
import { LandingPageComponent } from './components/global/landing-page-componenets/landing-page/landing-page.component';
import { UsersComponent } from './components/DSO/users-page-components/users/users.component';
import { HomeComponent } from './components/global/home-page-components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserProfileComponent } from './components/global/user-profile/user-profile/user-profile.component';
import { ProsumerhomeComponent } from './components/Prosumer/home-page-components/prosumerhome/prosumerhome.component';
import { ContactComponent } from './components/global/contact/contact.component';
import { DeviceComponent } from './components/global/device-page-components/device/device.component';
import { DevicesComponent } from './components/Prosumer/devices-page-components/devices/devices.component';
import { DevicesProductionComponent } from './components/Prosumer/devices-page-components/devices-production/devices-production.component';
import { DevicesConsumptionComponent } from './components/Prosumer/devices-page-components/devices-consumption/devices-consumption.component';
import { DevicesStockComponent } from './components/Prosumer/devices-page-components/devices-stock/devices-stock.component';
import { StatisticComponent } from './components/Prosumer/statistic-page-components/statistic/statistic.component';
import { DevicesAllComponent } from './components/Prosumer/devices-page-components/devices-all/devices-all.component';
import { UsersProsumersComponent } from './components/DSO/users-page-components/users-prosumers/users-prosumers.component';
import { UsersOperatorsComponent } from './components/DSO/users-page-components/users-operators/users-operators.component';
import { UserDSOComponent } from './components/DSO/user/user-dso/user-dso.component';
import { PageNotFoundComponent } from './components/global/page-not-found/page-not-found.component';
import { FaqPageComponenetsComponent } from './components/global/faq-page-componenets/faq-page-componenets.component';
import { SidebarNewComponent } from './components/global/layout-components/sidebar-new/sidebar-new.component';
import { ForgotPasswordComponent } from './components/global/forgot-password/forgot-password.component';
import { ResetPassword } from './models/reset-password.model';
import { ResetPasswordComponent } from './components/global/reset-password/reset-password.component';
import { AboutUsComponent } from './components/global/about-us/about-us.component';
import { NewsComponent } from './components/global/news/news.component';
import { LoginGuard } from './guards/login.guard';
import { AdminPageComponent } from './components/DSO/admin-page/admin-page.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate:[LoginGuard] },
  { path: 'aboutus', component: AboutUsComponent, canActivate:[AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent, pathMatch:'full', canActivate:[LoginGuard] },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'reset', component: ResetPasswordComponent},
  //{ path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'users/prosumers', component: UsersProsumersComponent, canActivate:[AuthGuard]},
  { path: 'user', component:UserProfileComponent, canActivate:[AuthGuard]},
  { path: 'contact', component:ContactComponent, canActivate:[AuthGuard]},
  { path: 'device/:id', component: DeviceComponent , canActivate:[AuthGuard]},
  { path: 'devices', component: DevicesAllComponent , canActivate:[AuthGuard]},
  { path: 'devices/production', component: DevicesProductionComponent , canActivate:[AuthGuard]},
  { path: 'devices/consumption', component: DevicesConsumptionComponent, canActivate:[AuthGuard] },
  { path: 'devices/stock', component: DevicesStockComponent, canActivate:[AuthGuard] },
  { path: 'statistics', component: StatisticComponent , canActivate:[AuthGuard]},
  { path: 'users', component: UsersComponent, canActivate:[AuthGuard]},
  { path: 'users/operators', component: UsersOperatorsComponent, canActivate:[AuthGuard]},
  { path: 'userDSO/:id', component: UserDSOComponent, canActivate:[AuthGuard]},
  { path: 'admin-operator/:id', component: AdminPageComponent, canActivate:[AuthGuard]},
  { path: 'PageNotFound', component:PageNotFoundComponent },
  { path: 'faq', component:FaqPageComponenetsComponent , canActivate:[AuthGuard]},
  { path: 'sidebar-new', component: SidebarNewComponent},
  { path: '**', redirectTo: '/PageNotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

