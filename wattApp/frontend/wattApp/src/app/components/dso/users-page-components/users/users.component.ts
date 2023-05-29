import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import { url } from 'src/app/app.module';
import { APIService } from 'src/app/services/api/api.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit{
  hostElement: HTMLElement | undefined;
  lightMode: Boolean = true;
  darkMode:Boolean = false;
  @ViewChild('searchInput') searchInput!: ElementRef;
  baseUrl = url + "/api/Images/user/";
  users: UserDTO[] = [];
  allUsersCount!: number;
  loader=true;
  pageSize: number = 10; // default page size
  currentPage: number = 1; // default current page
  numberOFAllUsers: any;
  numberOFProsumer: any;
  numberOFOperator: any;
  token = localStorage.getItem('token');
  display=false;

  Myid : any;

  constructor(private userService: UserService, 
              private aPIService: APIService,
              private authService: AuthService,
              private paginationService: PaginationService,
              private elementRef: ElementRef,) {

               
               }


  async ngOnInit(): Promise<void> {

    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
      if(dark){
        this.darkMode = true;
      }
    });
                  
    this.getNumber();
    this.paginationService.getCountData("/api/UserPagination/users/pagination/count").subscribe(result => (this.loader = false, this.allUsersCount = result));
    this.refreshAllUsers();

    if(this.token)
    {
      this.Myid = this.userService.getUserIdFromToken(this.token);
    }
  }

  onPageChange(event: any) {
    this.pageSize = this.pageSize; // implement changing of page size
    this.currentPage = event.first/this.pageSize + 1; // PrimeNG uses zero-based indexing, so we add 1 to get the current page number
    this.refreshAllUsers();
  }

  private refreshAllUsers(){
    this.paginationService.getData("/api/UserPagination/users/pagination/pageNo="+ this.currentPage + "&pageSize=" + this.pageSize + "&sortOrder=Username").subscribe((result) => (this.users = result));
  }

  clear(dtUsers: any) {
    this.searchInput.nativeElement.value = '';
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }

  getNumber() {
    this.aPIService.getNumber().subscribe((response: any) => {
      this.numberOFAllUsers=response.All;
      this.numberOFProsumer=response.Prosumer;
      this.numberOFOperator=response.Operator;
    });
  }

  isAdmin(): boolean {
    const token = this.authService.getToken();
    if (!token) {
      return false;
    }
    const userRole = this.userService.getUserRoleFromToken(token);
    return userRole === 'operator' || userRole === 'admin' || userRole === 'superadmin';
  }


}
