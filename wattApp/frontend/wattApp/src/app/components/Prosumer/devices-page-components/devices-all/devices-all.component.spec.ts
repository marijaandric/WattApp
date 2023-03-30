import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesAllComponent } from './devices-all.component';

describe('DevicesAllComponent', () => {
  let component: DevicesAllComponent;
  let fixture: ComponentFixture<DevicesAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
