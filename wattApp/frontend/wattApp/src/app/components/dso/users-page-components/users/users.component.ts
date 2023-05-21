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
  sortOrder: string = "";
  numberOFAllUsers: any;
  numberOFProsumer: any;
  numberOFOperator: any;
  filterValues: any = {
    name: '',
    address: '',
    email: '',
    role: ''
  };

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

  private refreshAllUsers() {
    let url = "/api/UserPagination/users/pagination?pageNo=" + this.currentPage 
              + "&pageSize=" + this.pageSize;
  
    if (this.sortOrder) {
      url += "&sortOrder=" + this.sortOrder;
    }
    if (this.filterValues.name) {
      url += "&name=" + this.filterValues.name;
    }
    if (this.filterValues.address) {
      url += "&address=" + this.filterValues.address;
    }
    if (this.filterValues.email) {
      url += "&email=" + this.filterValues.email;
    }
    if (this.filterValues.role) {
      url += "&role=" + this.filterValues.role;
    }
  
    this.paginationService.getData(url)
      .subscribe((result) => {
        this.users = result;
      });
  }

  applyFilters() {
    this.refreshAllUsers();
  }

  clear(dtUsers: any) {
    dtUsers.clear();
    this.sortOrder = "";
    this.filterValues.firstName = "";
    this.filterValues.address = "";
    this.filterValues.email = "";
    this.filterValues.role = "";
    this.refreshAllUsers();
  }

  getNumber() {
    this.aPIService.getNumber().subscribe((response: any) => {
      this.numberOFAllUsers=response.All;
      this.numberOFProsumer=response.Prosumer;
      this.numberOFOperator=response.Other;
    });
  }

}
