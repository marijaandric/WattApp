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

  uploadUserImageFile(imageDTO: ImageDTO, userId: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/octet-stream');
    const data = this.convertDataURIToBinary(imageDTO.data);
    return this.http.post(`${this.baseUrl}/user/${userId}`, data, { headers: headers });
  }
  
  private convertDataURIToBinary(dataURI: string): ArrayBuffer {
    const base64 = dataURI.replace(/^data:.*;base64,/, '');
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
  
}
