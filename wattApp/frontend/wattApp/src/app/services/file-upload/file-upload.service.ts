import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl: string = url + "/api/Images/";

  constructor(private http: HttpClient) { }
  
  deleteUserImage(id: number) {
    return this.http.delete(this.baseUrl + "user/" + id);
  }
}
