import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination/pagination.service';

@Component({
  selector: 'app-my-paginated-table',
  templateUrl: './my-paginated-table.component.html',
  styleUrls: ['./my-paginated-table.component.css']
})
export class MyPaginatedTableComponent {
  data!: any[]; // your data

  @Input() url!: string; // api url to fetch data from
  @Input() rowsPerPage!: number; // number of records per page
  @Input() totalRecords!: number; // total number of records 
  @Input() currentPage!: number; // current page number (0-indexed)

  @Input() class!: string;
  @Input() style!: string;
  @Input() dataKey!: string;
  @Input() scrollable!: boolean;
  @Input() paginator!: boolean;
  @Input() showCurrentPageReport!: boolean;
  @Input() globalFilterFields!: string[];

  constructor(private http: HttpClient,
              private paginationService: PaginationService) { }

  ngOnInit() {
    this.fetchData(this.currentPage);
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.fetchData(this.currentPage);
  }

  fetchData(page: number) {
    this.paginationService.getData("").subscribe((response) => {
      this.data = response;
    });
  }

}
