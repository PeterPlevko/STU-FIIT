import { TestBed } from '@angular/core/testing';

import { HistorianGuardGuard } from './historian-guard.guard';

describe('HistorianGuardGuard', () => {
  let guard: HistorianGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HistorianGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
