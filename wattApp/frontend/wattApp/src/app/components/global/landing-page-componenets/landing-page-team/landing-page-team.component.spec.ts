import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageTeamComponent } from './landing-page-team.component';

describe('LandingPageTeamComponent', () => {
  let component: LandingPageTeamComponent;
  let fixture: ComponentFixture<LandingPageTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
