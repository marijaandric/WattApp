import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.models';
import { GamesService } from 'src/app/service/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit{
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
