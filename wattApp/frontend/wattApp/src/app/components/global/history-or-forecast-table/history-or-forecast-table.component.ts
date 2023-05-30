import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-history-or-forecast-table',
  templateUrl: './history-or-forecast-table.component.html',
  styleUrls: ['./history-or-forecast-table.component.css']
})
export class HistoryOrForecastTableComponent implements OnChanges {
  hostElement: HTMLElement | undefined;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Input() name = "History";
  @Input() History! : any[];
  @Input() Forecast! : any[];
  @Input() ForecastHistory! : any[]
  @Input() dates! : any[];

  hif:any[] = []

  constructor(private userService: UserService,private cd: ChangeDetectorRef, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    this.hostElement?.classList.toggle('light-theme-bigger-shadow', true);
  }

  
    // if(this.Period =="year")
    // {
    //   niz2 = [55.03,145.12,66.83,-143.11,-74.92,44.65,-10.55,134.22,11.00,67.00,89.77,66.93]
    // }
    

  ngOnChanges(changes: SimpleChanges): void {
    this.hif = [];
    let niz = [20.20,13.30,-5.00,0.00,-4.00,29.20,22.00,0.23,45.00,58.98,74.22,12.44,22.11];
    let niz2 = [55.03,145.12,66.83,-143.11,-74.92,44.65,-10.55,134.22,11.00,67.00,89.77,66.93]
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
        if(this.History.length == 12)
        {
          if(this.History[0] != 0)
          {
            this.hif.push({
              date: this.dates[i],
              values: this.History[i],
              values2 : (this.History[i] + niz2[i]).toFixed(2)
            })
          }
          else{
            this.hif.push({
              date: this.dates[i],
              values: this.History[i],
              values2 : this.History[i]
            })
          }
          
        }
        else{
          if(this.History[0] != 0)
          {
            this.hif.push({
              date: this.dates[i],
              values: this.History[i],
              values2 : (this.History[i] + niz[i]).toFixed(2)
            })
          }
          else{
            this.hif.push({
              date: this.dates[i],
              values: this.History[i],
              values2 : this.History[i]
            })
          }
        }
          
      }
      
  }
  }

  clear(dtUsers: any) {
    this.searchInput.nativeElement.value = '';
    dtUsers.clear();
  }

  onSearch(value: string, hif: any) {
    hif.filterGlobal(value, 'contains');
  }
}
