import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapForAllUsersComponent } from './map-for-all-users.component';

describe('MapForAllUsersComponent', () => {
  let component: MapForAllUsersComponent;
  let fixture: ComponentFixture<MapForAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapForAllUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapForAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
