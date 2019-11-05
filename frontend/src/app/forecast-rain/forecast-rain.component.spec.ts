import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastRainComponent } from './forecast-rain.component';

describe('ForecastRainComponent', () => {
  let component: ForecastRainComponent;
  let fixture: ComponentFixture<ForecastRainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastRainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastRainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
