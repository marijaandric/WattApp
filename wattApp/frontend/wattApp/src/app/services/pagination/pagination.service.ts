import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private http: HttpClient) { }

  getData(apiuUrl: string){
    return this.http.get<any>(url + apiuUrl);
  }

}
