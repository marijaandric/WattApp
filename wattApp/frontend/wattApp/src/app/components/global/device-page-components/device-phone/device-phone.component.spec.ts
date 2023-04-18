import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePhoneComponent } from './device-phone.component';

describe('DevicePhoneComponent', () => {
  let component: DevicePhoneComponent;
  let fixture: ComponentFixture<DevicePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicePhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
