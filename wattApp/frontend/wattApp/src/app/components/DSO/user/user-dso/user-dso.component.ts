import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dso',
  templateUrl: './user-dso.component.html',
  styleUrls: ['./user-dso.component.css']
})
export class UserDSOComponent {
  id : any;
  Consumer:string='Consumer'
  Producer:string='Producer'
  Stock:string='Stock'

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
