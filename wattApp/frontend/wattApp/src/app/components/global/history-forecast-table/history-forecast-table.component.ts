import { Component, ViewEncapsulation } from '@angular/core';
import { UserDTO } from '../../../dtos/UserDTO';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-history-forecast-table',
  templateUrl: './history-forecast-table.component.html',
  styleUrls: ['./history-forecast-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryForecastTableComponent {
  users: UserDTO[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((result: UserDTO[]) => (this.users = result));
  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }
}
