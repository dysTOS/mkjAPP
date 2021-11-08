import { TestBed } from '@angular/core/testing';

import { AusrueckungenService } from './ausrueckungen.service';

describe('AusrueckungenService', () => {
  let service: AusrueckungenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AusrueckungenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
