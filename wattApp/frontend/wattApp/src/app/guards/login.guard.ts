import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router, private toast:NgToastService)
  {

  }

  canActivate():boolean{
    if(!this.auth.isLoggedIn())
    {
      return true;
    }
    else{
      this.router.navigate(['home']);
      return false;
    }
  }
  
}
