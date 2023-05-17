import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import { url } from 'src/app/app.module';
import { APIService } from 'src/app/services/api/api.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit{
  baseUrl = url + "/api/Images/user/";
  users: UserDTO[] = [];
  allUsersCount!: number;
  loader=true;
  pageSize: number = 10; // default page size
  currentPage: number = 1; // default current page
  sortOrder: string = "USERNAME";
  numberOFAllUsers: any;
  numberOFProsumer: any;
  numberOFOperator: any;

  constructor(private userService: UserService, 
              private aPIService: APIService,
              private paginationService: PaginationService) { }

  ngOnInit() {
    this.getNumber();
    this.paginationService.getCountData("/api/UserPagination/users/pagination/count").subscribe(result => (this.loader = false, this.allUsersCount = result));
    this.refreshAllUsers();
  }

  onPageChange(event: any) {
    this.pageSize = this.pageSize; // implement changing of page size
    this.currentPage = event.first/this.pageSize + 1; // PrimeNG uses zero-based indexing, so we add 1 to get the current page number
    this.refreshAllUsers();
  }

  customSort(event: SortEvent){
    const field = event.field;
    const order = event.order === 1 ? 'asc' : 'desc';
    this.sortOrder = field + " " + order;
    this.refreshAllUsers();
  }

  private refreshAllUsers(){
    this.paginationService.getData("/api/UserPagination/users/pagination/pageNo="+ this.currentPage + "&pageSize=" + this.pageSize + "&sortOrder=" + this.sortOrder).subscribe((result) => (this.users = result));
  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }

  getNumber() {
    this.aPIService.getNumber().subscribe((response: any) => {
      this.numberOFAllUsers=response.All;
      this.numberOFProsumer=response.Prosumer;
      this.numberOFOperator=response.Other;
    });
  }

}
