import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOneMenuBarComponent } from './select-one-menu-bar.component';

describe('SelectOneMenuBarComponent', () => {
  let component: SelectOneMenuBarComponent;
  let fixture: ComponentFixture<SelectOneMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOneMenuBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOneMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
