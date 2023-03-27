import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryForecastTableComponent } from './history-forecast-table.component';

describe('HistoryForecastTableComponent', () => {
  let component: HistoryForecastTableComponent;
  let fixture: ComponentFixture<HistoryForecastTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryForecastTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryForecastTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
