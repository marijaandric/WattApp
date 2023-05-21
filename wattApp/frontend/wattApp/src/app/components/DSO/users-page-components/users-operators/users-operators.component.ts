import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';
import { Table } from 'primeng/table';
import { url } from 'src/app/app.module';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-users-operators',
  templateUrl: './users-operators.component.html',
  styleUrls: ['./users-operators.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersOperatorsComponent implements OnInit {
  baseUrl = url + "/api/Images/user/";
  users: UserDTO[] = [];
  @ViewChild('dtUsers') dataTable!: Table;
  currentPage:number= 1;
  rowsPerPage:number = 10;
  sortOrder: string = "";
  allUsersCount!: number;
  loader=true;
  filterValues: any = {
    name: "",
    address: "",
    email: ""
  };

  constructor(private userService: UserService,
                private dsonew:DsonewsService) { }

  ngOnInit() {
    this.userService.getCountDataByType("operator").subscribe(result => this.allUsersCount = result);
    this.refreshAllUsers();
    this.getNews();
  }

  onPageChange(event: any) {
    this.rowsPerPage = this.rowsPerPage; // implement changing of page size
    this.currentPage = event.first/this.rowsPerPage;
    this.refreshAllUsers();
  }

  customSort(event: SortEvent){
    const field = event.field;
    const order = event.order === 1 ? 'asc' : 'desc';
    this.sortOrder = field + " " + order;
    this.refreshAllUsers();
  }

  private refreshAllUsers(){
    let url = "/api/User/pagination/getUsersPaginationByRole?page=" + this.currentPage 
              + "&limit=" + this.rowsPerPage;

    if (this.sortOrder) {
      url += "&sortOrder=" + this.sortOrder;
    }
    if (this.filterValues.name) {
      url += "&name=" + this.filterValues.name;
    }
    if (this.filterValues.addres) {
      url += "&address=" + this.filterValues.addres;
    }
    if (this.filterValues.email) {
      url += "&email=" + this.filterValues.email;
    }

    this.userService.getUsersPaginationByRole(url).subscribe((result: UserDTO[])=>(this.loader=false,this.users = result));
  }

  applyFilters() {
    this.refreshAllUsers();
  }

  clear(dtUsers: any) {
    dtUsers.clear();
    this.sortOrder = "";
    this.filterValues.name = "";
    this.filterValues.address = "";
    this.filterValues.email = "";
    this.refreshAllUsers();
  }

  news: any[] = [];
  
  naslov1 : any;
  naslov2 : any;
  naslov3 : any;

  sadrzaj1 : any;
  sadrzaj2 : any;
  sadrzaj3 : any;

  datum1 : any;
  datum2 : any;
  datum3 : any;

  status1 : any;
  status2 : any;
  status3 : any;
  getNews() {
  
    this.dsonew.getnew().subscribe((data: any) => {
      this.news = data;
      this.news.sort((a, b) => b.id - a.id);

    });
  
  }

}

