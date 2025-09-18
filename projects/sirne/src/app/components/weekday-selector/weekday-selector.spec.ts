import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdaySelector } from './weekday-selector';

describe('WeekdaySelector', () => {
  let component: WeekdaySelector;
  let fixture: ComponentFixture<WeekdaySelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekdaySelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekdaySelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
