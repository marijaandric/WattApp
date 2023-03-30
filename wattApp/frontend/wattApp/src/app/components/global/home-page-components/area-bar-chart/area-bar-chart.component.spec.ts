import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaBarChartComponent } from './area-bar-chart.component';

describe('AreaBarChartComponent', () => {
  let component: AreaBarChartComponent;
  let fixture: ComponentFixture<AreaBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
