import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { url } from '../../app.module';
import { UserDTO } from '../../dtos/UserDTO';
import { UserWithPowerUsageDTO } from 'src/app/dtos/UserWithPowerUsageDTO ';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = url + "/api/User/";

  constructor(private http: HttpClient,private jwtHelper:JwtHelperService) { }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.baseUrl).pipe(
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

  GetUser(userId: number, token: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(`${this.baseUrl}/${userId}`, { headers });
  }

  GetUserWithoutToken(userId: number) {
    return this.http.get(`${this.baseUrl}${userId}`);
  }

  getUserIdFromToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.nameid;
  }

  getUserRoleFromToken(token: string)
  {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.role;
  }

  PutUser(id : number,user : any): Observable<any>
  {
    const url = this.baseUrl+`/${id}`;
    return this.http.put(url,user);
  }
  
  getUsersProsumersPagination(apiUrl:string): Observable<UserWithPowerUsageDTO[]> {
    return this.http.get<UserWithPowerUsageDTO[]>(url + apiUrl).pipe(
      map(users => {
        return users.map(userWithPowerUsage => new UserWithPowerUsageDTO(
          new UserDTO(
            userWithPowerUsage.user.id,
            userWithPowerUsage.user.firstName,
            userWithPowerUsage.user.lastName,
            userWithPowerUsage.user.email,
            userWithPowerUsage.user.password,
            userWithPowerUsage.user.token,
            userWithPowerUsage.user.address,
            userWithPowerUsage.user.role,
            userWithPowerUsage.user.x,
            userWithPowerUsage.user.y,
            userWithPowerUsage.user.area,
            userWithPowerUsage.user.imageId
          ),
          userWithPowerUsage.consumption,
          userWithPowerUsage.production,
          userWithPowerUsage.stock
        ));
      })
    );
  }

  getUsersPaginationByRole(apiUrl:string): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(url + apiUrl).pipe(
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

  getCountDataByType(type: string){
    return this.http.get<number>(this.baseUrl + "getUsersPaginationByRole/" + type);
  }

  getUsersWithPowerUsage(type:string,ids:number[])
  {
    const url = this.baseUrl+`/getUsersWithPowerUsage/`+type;
    return this.http.put(url,ids);
  }

  deleteUser(id: number) {
    const url = `${this.baseUrl}${id}`;
    return this.http.delete(url);
  }
}
