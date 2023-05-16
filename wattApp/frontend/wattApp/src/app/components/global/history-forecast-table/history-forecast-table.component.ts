import { ChangeDetectorRef, Component, ElementRef, Input, Renderer2, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { UserDTO } from '../../../dtos/UserDTO';
import { UserService } from '../../../services/user/user.service';

interface HiF{
  history: any,
  forecast: any,
  date1: any,
  date2: any
}

@Component({
  selector: 'app-history-forecast-table',
  templateUrl: './history-forecast-table.component.html',
  styleUrls: ['./history-forecast-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryForecastTableComponent {
  hostElement: HTMLElement | undefined;

  @Input() name1 = "history";
  @Input() name2 = "forecast";

  @Input() hif : HiF[]  = [{history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []},
  {history: 0, forecast: 0, date1: [], date2: []}];

  constructor(private userService: UserService,private cd: ChangeDetectorRef, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    
    this.hostElement = this.elementRef.nativeElement as HTMLElement;
    this.hostElement?.classList.toggle('light-theme-bigger-shadow', true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  clear(dtUsers: any) {
    dtUsers.clear();
  }

  onSearch(value: string, dtUsers: any) {
    dtUsers.filterGlobal(value, 'contains');
  }
}
