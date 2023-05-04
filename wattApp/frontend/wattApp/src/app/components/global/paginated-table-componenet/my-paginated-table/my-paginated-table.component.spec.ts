import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPaginatedTableComponent } from './my-paginated-table.component';

describe('MyPaginatedTableComponent', () => {
  let component: MyPaginatedTableComponent;
  let fixture: ComponentFixture<MyPaginatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPaginatedTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPaginatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
