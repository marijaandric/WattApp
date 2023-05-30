import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-datas-table',
  templateUrl: './datas-table.component.html',
  styleUrls: ['./datas-table.component.css']
})
export class DatasTableComponent implements OnChanges{
  @Input() hif!:any[];
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('dtUsers', { static: false }) table!: Table;
  lightMode : Boolean = true;

  constructor(private userService:UserService)
  {

  }

  ngOnInit()
  {
    const token = localStorage.getItem('token');
    this.userService.isDark$.subscribe(dark => {
      this.lightMode = !dark;
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hif = this.hif
  }

  
  clear(dtUsers: any) {
    this.searchInput.nativeElement.value = '';
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }
  
}
