import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class RoleTypesService {
  private baseUrl: string = url + "/api/RoleTypes/";

  constructor(private http: HttpClient) { } 

  getAllRoleTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }
}
