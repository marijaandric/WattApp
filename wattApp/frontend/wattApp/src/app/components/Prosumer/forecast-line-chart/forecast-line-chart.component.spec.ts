import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastLineChartComponent } from './forecast-line-chart.component';

describe('ForecastLineChartComponent', () => {
  let component: ForecastLineChartComponent;
  let fixture: ComponentFixture<ForecastLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
