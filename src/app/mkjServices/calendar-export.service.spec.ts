import { TestBed } from '@angular/core/testing';

import { CalendarExportService } from './calendar-export.service';

describe('CalendarExportService', () => {
  let service: CalendarExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
