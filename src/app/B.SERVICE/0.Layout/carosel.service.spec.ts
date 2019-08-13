import { TestBed } from '@angular/core/testing';

import { CaroselService } from './carosel.service';

describe('CaroselService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaroselService = TestBed.get(CaroselService);
    expect(service).toBeTruthy();
  });
});
