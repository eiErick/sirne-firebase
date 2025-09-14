import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cerebellum } from './cerebellum';

describe('Cerebellum', () => {
  let component: Cerebellum;
  let fixture: ComponentFixture<Cerebellum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cerebellum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cerebellum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
