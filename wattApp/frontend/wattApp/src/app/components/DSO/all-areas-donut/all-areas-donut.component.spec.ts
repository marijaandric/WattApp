import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAreasDonutComponent } from './all-areas-donut.component';

describe('AllAreasDonutComponent', () => {
  let component: AllAreasDonutComponent;
  let fixture: ComponentFixture<AllAreasDonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAreasDonutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAreasDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
