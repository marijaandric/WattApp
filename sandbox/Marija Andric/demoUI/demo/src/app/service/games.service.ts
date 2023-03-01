import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.models';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  baseUrl = 'https://localhost:7194/api/game';

  constructor(private http : HttpClient) 
  { }

  GetAllGames() : Observable<Game[]>
  {
    return this.http.get<Game[]>(this.baseUrl);
  }

  DeleteGame(id : string) : Observable<Game>
  {
    return this.http.delete<Game>(this.baseUrl + "/" + id);
  }

  AddGame(game : Game) :Observable<Game>
  {
    game.id='00000000-0000-0000-0000-000000000000';
    return this.http.post<Game>(this.baseUrl,game);
  }

  getGame(id : string) :Observable<Game>
  {
    return this.http.get<Game>(this.baseUrl + "/" + id);
  }

  updateGame(id:string, updateGameRequest: Game):Observable<Game>
  {
    return this.http.put<Game>(this.baseUrl+'/'+id, updateGameRequest)
  }
}
