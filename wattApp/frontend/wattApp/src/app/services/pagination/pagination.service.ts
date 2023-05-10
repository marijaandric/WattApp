import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { url } from 'src/app/app.module';
import { UserDTO } from 'src/app/dtos/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private http: HttpClient) { }

  getData(apiuUrl: string){
    console.log(url + apiuUrl);
    return this.http.get<UserDTO[]>(url + apiuUrl).pipe(
      map(users => {
        return users.map(user => new UserDTO(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.password,
          user.token,
          user.address,
          user.role,
          user.x,
          user.y,
          user.area,
          user.imageId
        ));
      })
    );
  }

  getCountData(apiuUrl: string) {
    return this.http.get<number>(url + apiuUrl);
  }

}
