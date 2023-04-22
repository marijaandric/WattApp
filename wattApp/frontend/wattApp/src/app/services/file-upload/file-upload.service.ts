import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/app/app.module';
import { ImageDTO } from 'src/app/dtos/ImageDTO';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl: string = url + "/api/Images/";

  constructor(private http: HttpClient) { }
  
}
