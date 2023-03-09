import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../Core/Entities/User';
import { UserService } from '../../../Services/Users/user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() user?: User;
  @Output() usersUpdated = new EventEmitter<User[]>();

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  updateUser(user: User) {
    this.userService
      .updateUser(user)
      .subscribe((users: User[]) => this.usersUpdated.emit(users));
  }

  deleteUser(user: User) {
    this.userService
      .deleteUser(user)
      .subscribe((users: User[]) => this.usersUpdated.emit(users));
  }

  createUser(user: User) {
    this.userService
      .createUser(user)
      .subscribe((users: User[]) => this.usersUpdated.emit(users));
  }

  cancel() {
    this.userService.getUsers().subscribe((users: User[]) => this.usersUpdated.emit(users));
  }
}
