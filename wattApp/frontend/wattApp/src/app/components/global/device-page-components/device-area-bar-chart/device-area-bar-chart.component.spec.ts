import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAreaBarChartComponent } from './device-area-bar-chart.component';

describe('DeviceAreaBarChartComponent', () => {
  let component: DeviceAreaBarChartComponent;
  let fixture: ComponentFixture<DeviceAreaBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceAreaBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceAreaBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
