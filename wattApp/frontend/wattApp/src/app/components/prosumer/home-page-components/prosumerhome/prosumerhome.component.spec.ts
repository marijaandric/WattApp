import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerhomeComponent } from './prosumerhome.component';

describe('ProsumerhomeComponent', () => {
  let component: ProsumerhomeComponent;
  let fixture: ComponentFixture<ProsumerhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProsumerhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProsumerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
