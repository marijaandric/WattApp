import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecast7Component } from './weather-forecast7.component';

describe('WeatherForecast7Component', () => {
  let component: WeatherForecast7Component;
  let fixture: ComponentFixture<WeatherForecast7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherForecast7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherForecast7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
