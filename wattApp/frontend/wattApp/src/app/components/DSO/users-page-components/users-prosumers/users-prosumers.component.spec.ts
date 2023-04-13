import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProsumersComponent } from './users-prosumers.component';

describe('UsersProsumersComponent', () => {
  let component: UsersProsumersComponent;
  let fixture: ComponentFixture<UsersProsumersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersProsumersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersProsumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
