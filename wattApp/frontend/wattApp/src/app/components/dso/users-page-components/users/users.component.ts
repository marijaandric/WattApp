import { Component } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: UserDTO[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((result: UserDTO[]) => (this.users = result));
  }
}
