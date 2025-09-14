import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalDialog } from './nutritional-dialog';

describe('NutritionalDialog', () => {
  let component: NutritionalDialog;
  let fixture: ComponentFixture<NutritionalDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionalDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionalDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
