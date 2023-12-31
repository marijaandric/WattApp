import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import { DsonewsService } from 'src/app/services/dsonews/dsonews.service';
import { Table } from 'primeng/table';
import { url } from 'src/app/app.module';

@Component({
  selector: 'app-users-operators',
  templateUrl: './users-operators.component.html',
  styleUrls: ['./users-operators.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersOperatorsComponent implements OnInit {
  hostElement: HTMLElement | undefined;
  lightMode: Boolean = true;
  @ViewChild('searchInput') searchInput!: ElementRef;
  baseUrl = url + "/api/Images/user/";
  users: UserDTO[] = [];
  @ViewChild('dtUsers') dataTable!: Table;
  currentPage:number= 0;
  rowsPerPage:number = 10;
  allUsersCount!: number;
  loader=true;
  token = localStorage.getItem('token');

  Myid : any;

  constructor(private userService: UserService,
                private dsonew:DsonewsService,
                private elementRef: ElementRef) { }


  async ngOnInit(): Promise<void> {

    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
     
    });
    this.userService.getCountDataByType("operator").subscribe(result => this.allUsersCount = result);
    this.refreshAllUsers();
    this.getNews();
    if(this.token)
    {
      this.Myid = this.userService.getUserIdFromToken(this.token);
    }
  }

  onPageChange(event: any) {
    this.rowsPerPage = this.rowsPerPage; // implement changing of page size
    this.currentPage = event.first/this.rowsPerPage;
    this.refreshAllUsers();
  }

  private refreshAllUsers(){
    this.userService.getUsersPaginationByRole("operator", this.currentPage, this.rowsPerPage).subscribe((result: UserDTO[])=>(this.loader=false,this.users = result));
  }

  clear(dtUsers: any) {
    this.searchInput.nativeElement.value = '';
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
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

