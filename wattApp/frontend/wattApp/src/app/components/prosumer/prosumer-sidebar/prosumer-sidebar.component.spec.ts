import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerSidebarComponent } from './prosumer-sidebar.component';

describe('ProsumerSidebarComponent', () => {
  let component: ProsumerSidebarComponent;
  let fixture: ComponentFixture<ProsumerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
