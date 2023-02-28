import { Component } from '@angular/core';
import { User } from './Core/Entities/User';
import { UserService } from './Services/Users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Demo Application';
}
