import { TestBed } from '@angular/core/testing';

import { HistorianserviceService } from './historianservice.service';

describe('HistorianserviceService', () => {
  let service: HistorianserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorianserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
