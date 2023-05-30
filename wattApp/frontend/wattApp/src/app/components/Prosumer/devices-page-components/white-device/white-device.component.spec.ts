import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteDeviceComponent } from './white-device.component';

describe('WhiteDeviceComponent', () => {
  let component: WhiteDeviceComponent;
  let fixture: ComponentFixture<WhiteDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
