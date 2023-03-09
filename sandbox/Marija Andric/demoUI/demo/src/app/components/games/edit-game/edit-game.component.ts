import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Game } from 'src/app/models/game.models';
import { GamesService } from 'src/app/service/games.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit{
  gamedetails : Game = {
    id : '',
    name : '',
    description : '',
    mode : '',
    genre : ''
  }
  constructor(private router: Router,private route: ActivatedRoute, private gameService : GamesService)
  {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next : (params) => {
        const id = params.get('id');

        if(id)
        {
          this.gameService.getGame(id)
          .subscribe({
            next: (response) => {
              this.gamedetails = response;
            }
          });
        }
      }
    })
  }

  updateGame()
  {
    this.gameService.updateGame(this.gamedetails.id,  this.gamedetails)
    .subscribe(
      {
        next : (response) => {
          this.router.navigate(['']);
        }
      }
    );
  }
  
}
