import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDesktopComponent } from './device-desktop.component';

describe('DeviceDesktopComponent', () => {
  let component: DeviceDesktopComponent;
  let fixture: ComponentFixture<DeviceDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceDesktopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
