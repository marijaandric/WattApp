import { Component, OnInit } from '@angular/core';
import { Game } from './models/game.models';
import { GamesService } from './service/games.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'games';
  games : Game[] = [];
  game: Game = {
    id :'',
    name : '',
    description : '',
    mode : '',
    genre : ''
  }

  constructor(private gameService : GamesService)
  {

  }

  ngOnInit(): void {
    this.GetAllGames();
  }

  GetAllGames()
  {
    this.gameService.GetAllGames()
    .subscribe(
      response => {
        this.games = response;
        console.log(response);
      }
    )
  }

  DeleteGame(id : string)
  {
    this.gameService.DeleteGame(id)
    .subscribe(
      response => {
        this.GetAllGames();
        console.log(response)
      }
      )
  }

  onSubmit()
  {
    this.gameService.AddGame(this.game)
    .subscribe(
      response => {
        this.GetAllGames();
        console.log(response)
      }
      )
  }

}
