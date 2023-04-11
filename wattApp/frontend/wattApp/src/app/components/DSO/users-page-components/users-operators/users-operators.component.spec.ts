import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOperatorsComponent } from './users-operators.component';

describe('UsersOperatorsComponent', () => {
  let component: UsersOperatorsComponent;
  let fixture: ComponentFixture<UsersOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersOperatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
