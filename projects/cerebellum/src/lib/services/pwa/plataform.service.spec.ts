import { TestBed } from '@angular/core/testing';

import { PlataformService } from './plataform.service';

describe('Pwa', () => {
  let service: PlataformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlataformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
