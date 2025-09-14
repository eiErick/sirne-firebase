import { TestBed } from '@angular/core/testing';

import { KiamService } from './kiam.service';

describe('KiamService', () => {
  let service: KiamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KiamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
