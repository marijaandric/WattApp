import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapForDsoUserComponent } from './map-for-dso-user.component';

describe('MapForDsoUserComponent', () => {
  let component: MapForDsoUserComponent;
  let fixture: ComponentFixture<MapForDsoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapForDsoUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapForDsoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
