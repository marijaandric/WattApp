import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMenuDsoComponent } from './tab-menu-dso.component';

describe('TabMenuDsoComponent', () => {
  let component: TabMenuDsoComponent;
  let fixture: ComponentFixture<TabMenuDsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabMenuDsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabMenuDsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
