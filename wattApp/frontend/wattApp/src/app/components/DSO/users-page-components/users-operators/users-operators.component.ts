import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation  } from '@angular/core';
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
  baseUrl = url + "/api/Images/user/";
  users: UserDTO[] = [];
  @ViewChild('dtUsers') dataTable!: Table;
  totalRecords:number = 0;
  currentpage:number= 0;
  loader=true;

  constructor(private userService: UserService,private dsonew:DsonewsService) {

 }

  ngOnInit() {
    //this.userService.getAllUsers().subscribe((result: UserDTO[]) => (this.users = result));
    this.userService.getUsersPaginationByRole("operator",this.currentpage,2).subscribe((result: UserDTO[])=>(this.loader=false,this.users = result))
    this.getNews();
  }

  clear(dtUsers: any) {
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

