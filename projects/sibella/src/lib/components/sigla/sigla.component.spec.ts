import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiglaComponent } from './sigla.component';

describe('SiglaComponent', () => {
  let component: SiglaComponent;
  let fixture: ComponentFixture<SiglaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiglaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiglaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
