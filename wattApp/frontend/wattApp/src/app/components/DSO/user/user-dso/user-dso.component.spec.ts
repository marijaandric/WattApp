import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDSOComponent } from './user-dso.component';

describe('UserDSOComponent', () => {
  let component: UserDSOComponent;
  let fixture: ComponentFixture<UserDSOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDSOComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
