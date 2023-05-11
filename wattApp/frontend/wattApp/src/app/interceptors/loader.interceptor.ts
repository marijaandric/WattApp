import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(request).pipe(
      tap(() => {}, () => {}, () => this.loaderService.hide()),
      finalize(() => this.loaderService.hide())
    );
  }
}