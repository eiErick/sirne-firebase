import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sibella } from './sibella';

describe('Sibella', () => {
  let component: Sibella;
  let fixture: ComponentFixture<Sibella>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sibella]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sibella);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
