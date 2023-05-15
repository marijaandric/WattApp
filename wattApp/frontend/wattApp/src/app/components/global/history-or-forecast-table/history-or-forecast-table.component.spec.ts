import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOrForecastTableComponent } from './history-or-forecast-table.component';

describe('HistoryOrForecastTableComponent', () => {
  let component: HistoryOrForecastTableComponent;
  let fixture: ComponentFixture<HistoryOrForecastTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOrForecastTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryOrForecastTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
