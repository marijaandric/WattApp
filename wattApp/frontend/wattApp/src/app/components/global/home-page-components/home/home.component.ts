import { Component, ElementRef, Renderer2  } from '@angular/core';
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
export class HomeComponent {

  constructor(private authService:AuthService, private userService:UserService){}
  
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
