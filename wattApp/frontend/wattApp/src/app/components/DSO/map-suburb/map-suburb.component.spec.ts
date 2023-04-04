import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSuburbComponent } from './map-suburb.component';

describe('MapSuburbComponent', () => {
  let component: MapSuburbComponent;
  let fixture: ComponentFixture<MapSuburbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSuburbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSuburbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
