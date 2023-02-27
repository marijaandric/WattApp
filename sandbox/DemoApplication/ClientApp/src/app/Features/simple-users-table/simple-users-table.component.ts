import { Component } from '@angular/core';
import { User } from '../../Core/Entities/User';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'simple-users-table',
  templateUrl: './simple-users-table.component.html',
  styleUrls: ['./simple-users-table.component.css']
})
export class SimpleUsersTableComponent {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((result: User[]) => (this.users = result));
  }
}
