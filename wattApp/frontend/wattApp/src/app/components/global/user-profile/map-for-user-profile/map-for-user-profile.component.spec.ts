import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapForUserProfileComponent } from './map-for-user-profile.component';

describe('MapForUserProfileComponent', () => {
  let component: MapForUserProfileComponent;
  let fixture: ComponentFixture<MapForUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapForUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapForUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
