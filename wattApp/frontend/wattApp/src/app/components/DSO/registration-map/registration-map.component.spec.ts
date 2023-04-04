import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMapComponent } from './registration-map.component';

describe('RegistrationMapComponent', () => {
  let component: RegistrationMapComponent;
  let fixture: ComponentFixture<RegistrationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
