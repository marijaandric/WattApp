import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesProductionComponent } from './devices-production.component';

describe('DevicesProductionComponent', () => {
  let component: DevicesProductionComponent;
  let fixture: ComponentFixture<DevicesProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesProductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
