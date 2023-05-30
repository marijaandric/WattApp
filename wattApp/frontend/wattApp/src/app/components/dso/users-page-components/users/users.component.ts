import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation  } from '@angular/core';
import { UserDTO } from '../../../../dtos/UserDTO';
import { UserService } from '../../../../services/user/user.service';
import { url } from 'src/app/app.module';
import { APIService } from 'src/app/services/api/api.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Table } from 'primeng/table';
import { SelectItem } from 'primeng/api';

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
  @ViewChild('dtUsers', { static: false }) table!: Table;
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
  statusFilterOptions: SelectItem[];
  selectedStatusFilter: any;
  Myid : any;

  constructor(private userService: UserService, 
              private aPIService: APIService,
              private authService: AuthService,
              private toast:NgToastService,
              private routers:Router,
              private paginationService: PaginationService,
              private elementRef: ElementRef,) {

                this.statusFilterOptions = [
                  { label: 'Prosumer', value: 'prosumer' },
                  { label: 'Admin', value: 'admin' },
                  { label: 'Operator', value: 'operator' }
                ];
               
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
 

  showDialog(event: MouseEvent) {
    event.stopPropagation();
    this.display = !this.display;
  }
  deleteid:any;
  setID(userId: any) {
    this.deleteid=userId;
  }

  getNumber() {
    this.aPIService.getNumber().subscribe((response: any) => {
      this.numberOFAllUsers=response.All;
      this.numberOFProsumer=response.Prosumer;
      this.numberOFOperator=response.Operator;
    });
  }

  deleteUser(deleteId: any)
  {
    this.userService.deleteUser(deleteId).subscribe(data=>{
      this.toast.success({detail:"SUCCESS",summary:"You have successfully added device",duration:5000});
        this.display = false;
      setTimeout(() => {
        location.reload();
      }, 1350)
    })
  }

  isAdmin(): boolean {
    const token = this.authService.getToken();
    if (!token) {
      return false;
    }
    const userRole = this.userService.getUserRoleFromToken(token);
    return userRole === 'operator' || userRole === 'admin' || userRole === 'superadmin';
  }

  filterStatus(value: any) {
    this.table.filter(value, 'role', 'equals');
  }

  getSeverity(label: string):string {
    if (label === 'Consumer') {
      return 'Consumer';
    } else if (label === 'Producer') {
      return 'Producer';
    } else if (label === 'Stock') {
      return 'Stock';
    } else {
      return 'All';
    }
  }


}
