import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadardTemplateComponent } from './stadard-template.component';

describe('StadardTemplateComponent', () => {
  let component: StadardTemplateComponent;
  let fixture: ComponentFixture<StadardTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StadardTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StadardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
