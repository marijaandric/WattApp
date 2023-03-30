import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApi } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth : AuthService,private toast:NgToastService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const mytoken = this.auth.getToken();

  if(mytoken){
    request = request.clone({
      setHeaders:{Authorization:`Bearer ${mytoken}`}
    });
  }

    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse)
        {
          if(err.status === 401)
          {
            //this.toast.warning({detail:"Warning",summary:"Token is expired, Login again."})
            //this.router.navigate(['login']);
            return this.handleError(request,next);
          }
        }
        return throwError(()=> new Error("Some other error occured"));
      })
    );

    
  }

  handleError(req : HttpRequest<any>,next : HttpHandler)
  {
    const tokenApiModel = new TokenApi();

    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewTooken(tokenApiModel)
    .pipe(
      switchMap((data: TokenApi)=> {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone({
          setHeaders:{Authorization:`Bearer ${data.accessToken}`}
        });
        return next.handle(req)
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({detail:"Warning",summary:"Token is expired, Login again."})
          this.router.navigate(['login']);
        })
      })
    )
  }

}
