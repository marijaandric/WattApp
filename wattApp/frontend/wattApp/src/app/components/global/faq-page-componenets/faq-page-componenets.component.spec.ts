import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqPageComponenetsComponent } from './faq-page-componenets.component';

describe('FaqPageComponenetsComponent', () => {
  let component: FaqPageComponenetsComponent;
  let fixture: ComponentFixture<FaqPageComponenetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqPageComponenetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqPageComponenetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
