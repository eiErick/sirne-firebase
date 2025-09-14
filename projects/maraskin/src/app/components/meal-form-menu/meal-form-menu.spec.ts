import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealFormMenu } from './meal-form-menu';

describe('MealFormMenu', () => {
  let component: MealFormMenu;
  let fixture: ComponentFixture<MealFormMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealFormMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealFormMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
