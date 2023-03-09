import { Component } from '@angular/core';
import { User } from '../../../Core/Entities/User';
import { UserService } from '../../../Services/Users/user.service';

@Component({
  selector: 'simple-users-table',
  templateUrl: './simple-users-table.component.html',
  styleUrls: ['./simple-users-table.component.css']
})
export class SimpleUsersTableComponent {
  users: User[] = [];
  userToEdit?: User; 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((result: User[]) => (this.users = result));
  }

  initNewUser() {
    this.userToEdit = new User();
  }

  editUser(user: User) {
    this.userToEdit = user;
  }

  updateUserList(users: User[]) {
    this.users = users;
    this.userToEdit = undefined;
  }
  
}
