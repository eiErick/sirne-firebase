import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAvatar } from './my-avatar';

describe('MyAvatar', () => {
  let component: MyAvatar;
  let fixture: ComponentFixture<MyAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAvatar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
