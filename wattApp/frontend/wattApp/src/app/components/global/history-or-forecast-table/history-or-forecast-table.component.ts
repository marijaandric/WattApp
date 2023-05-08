import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-history-or-forecast-table',
  templateUrl: './history-or-forecast-table.component.html',
  styleUrls: ['./history-or-forecast-table.component.css']
})
export class HistoryOrForecastTableComponent implements OnChanges {
  @Input() name = "History";
  @Input() History! : any[];
  @Input() Forecast! : any[];
  @Input() dates! : any[];

  hif:any[] = []

  constructor(private userService: UserService,private cd: ChangeDetectorRef) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hif = [];
    for(let i=0; i<this.dates.length; i++){
      if(this.History[0] === null && this.Forecast[0] != null)
      {
          this.hif.push({
          date: this.dates[i],
          values: this.Forecast[i]
      })
      }
      else if(this.Forecast[0] === null && this.History[0] != null)
      {
          this.hif.push({
          date: this.dates[i],
          values: this.History[i]
      })
      }
      
  }
  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }

  onSearch(value: string, hif: any) {
    hif.filterGlobal(value, 'contains');
  }
}
