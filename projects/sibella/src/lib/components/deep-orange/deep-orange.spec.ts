import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepOrange } from './deep-orange';

describe('DeepOrange', () => {
  let component: DeepOrange;
  let fixture: ComponentFixture<DeepOrange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeepOrange]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepOrange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
