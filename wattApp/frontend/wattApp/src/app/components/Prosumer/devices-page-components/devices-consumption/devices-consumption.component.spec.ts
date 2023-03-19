import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesConsumptionComponent } from './devices-consumption.component';

describe('DevicesConsumptionComponent', () => {
  let component: DevicesConsumptionComponent;
  let fixture: ComponentFixture<DevicesConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesConsumptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
