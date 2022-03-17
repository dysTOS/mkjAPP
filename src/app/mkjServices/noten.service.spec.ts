import { TestBed } from '@angular/core/testing';

import { NotenService } from './noten.service';

describe('NotenService', () => {
  let service: NotenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
