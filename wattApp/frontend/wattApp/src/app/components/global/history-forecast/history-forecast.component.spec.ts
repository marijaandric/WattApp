import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryForecastComponent } from './history-forecast.component';

describe('HistoryForecastComponent', () => {
  let component: HistoryForecastComponent;
  let fixture: ComponentFixture<HistoryForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
