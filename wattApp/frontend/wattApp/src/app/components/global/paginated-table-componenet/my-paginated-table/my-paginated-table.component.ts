import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-paginated-table',
  templateUrl: './my-paginated-table.component.html',
  styleUrls: ['./my-paginated-table.component.css']
})
export class MyPaginatedTableComponent {
  @Input() data!: any[]; // your data
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

  @Output() onPageChange = new EventEmitter<any>();

}
