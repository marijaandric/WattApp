import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDSOComponent } from './home-dso.component';

describe('HomeDSOComponent', () => {
  let component: HomeDSOComponent;
  let fixture: ComponentFixture<HomeDSOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDSOComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
