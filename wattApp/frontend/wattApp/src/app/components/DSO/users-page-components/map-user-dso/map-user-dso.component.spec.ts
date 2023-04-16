import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUserDsoComponent } from './map-user-dso.component';

describe('MapUserDsoComponent', () => {
  let component: MapUserDsoComponent;
  let fixture: ComponentFixture<MapUserDsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapUserDsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapUserDsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
