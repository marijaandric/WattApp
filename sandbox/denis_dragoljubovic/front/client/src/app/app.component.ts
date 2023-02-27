import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users: User[] = [];
  user: User = {
    id: '',
    userName:'',
    age:'',
    role:''
  }

  constructor(private usersService : UsersService){
    
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
  
  getAllUsers(){
    this.usersService.getAllUsers().subscribe(
      response => {
        this.users = response;
      }
    );
  }

  onSubmit(){
    if(this.user.id === ''){
      this.usersService.addUser(this.user).subscribe(
        response => {
          this.getAllUsers();
          this.user={
            id: '',
            userName:'',
            age:'',
            role:''
          }
        }
      );
    }
    else{
      this.updateUser(this.user);
    }
  }

  deleteUser(id:string){
    this.usersService.deleteUser(id).subscribe(
      response => {
        this.getAllUsers();
      }
    )
  }

  populateForm(user: User){
    this.user = user;
  }

  updateUser(user: User){
    this.usersService.updateUser(user).subscribe(
      response => {
        this.getAllUsers();
      }
    )
  }
}
