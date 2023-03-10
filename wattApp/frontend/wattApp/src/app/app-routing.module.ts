import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/global/login/login.component';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { LandingPageComponent } from './components/global/landing-page/landing-page.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'', component: LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
