import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLineChartComponent } from './history-line-chart.component';

describe('HistoryLineChartComponent', () => {
  let component: HistoryLineChartComponent;
  let fixture: ComponentFixture<HistoryLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
