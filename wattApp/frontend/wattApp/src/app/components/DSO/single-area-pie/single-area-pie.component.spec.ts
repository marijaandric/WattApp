import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAreaPieComponent } from './single-area-pie.component';

describe('SingleAreaPieComponent', () => {
  let component: SingleAreaPieComponent;
  let fixture: ComponentFixture<SingleAreaPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAreaPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleAreaPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
