import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/global/login-page-components/login/login.component';
import { NavbarComponent } from './components/global/landing-page-componenets/navbar/navbar.component';
import { LandingPageComponent } from './components/global/landing-page-componenets/landing-page/landing-page.component';
import { UsersComponent } from './components/dso/users-page-components/users/users.component';
import { HomeComponent } from './components/global/home-page-components/home/home.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }