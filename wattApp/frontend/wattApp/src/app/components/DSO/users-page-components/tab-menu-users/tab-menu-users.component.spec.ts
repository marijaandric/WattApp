import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMenuUsersComponent } from './tab-menu-users.component';

describe('TabMenuUsersComponent', () => {
  let component: TabMenuUsersComponent;
  let fixture: ComponentFixture<TabMenuUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabMenuUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabMenuUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
