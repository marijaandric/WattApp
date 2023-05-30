import { Component, ElementRef, OnInit, Renderer2  } from '@angular/core';
import { UserDTO } from 'src/app/dtos/UserDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
/*import { UserService } from 'src/app/services/user.service';
*/
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private authService:AuthService, private userService:UserService){}
  user :any
  ngOnInit(): void {
    //localStorage.getItem('myVariable')
    const token = this.authService.getToken();
    if(token)
    {
      const id = this.userService.getUserIdFromToken(token)
      this.userService.GetUser(id,token).subscribe( data => {
        this.user = data
        localStorage.setItem('myVariable', this.user.isDarkTheme);
      })
    }

  }
  
  isAdmin()
  {
    const token = this.authService.getToken();
    if(token)
    {
      const role = this.userService.getUserRoleFromToken(token);
      if(role == "prosumer")
      {
        return false;
      }
      else{
        return true;
      }
      
    }
    else{
      return false;
    }
    
  }
  
}
