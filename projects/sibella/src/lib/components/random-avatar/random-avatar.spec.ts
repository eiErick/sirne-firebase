import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomAvatar } from './random-avatar';

describe('RandomAvatar', () => {
  let component: RandomAvatar;
  let fixture: ComponentFixture<RandomAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomAvatar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
