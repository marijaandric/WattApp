import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePrototypeComponent } from './device-prototype.component';

describe('DevicePrototypeComponent', () => {
  let component: DevicePrototypeComponent;
  let fixture: ComponentFixture<DevicePrototypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicePrototypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicePrototypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
