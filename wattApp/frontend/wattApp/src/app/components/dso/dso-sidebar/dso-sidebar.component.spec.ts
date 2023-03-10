import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsoSidebarComponent } from './dso-sidebar.component';

describe('DsoSidebarComponent', () => {
  let component: DsoSidebarComponent;
  let fixture: ComponentFixture<DsoSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsoSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
