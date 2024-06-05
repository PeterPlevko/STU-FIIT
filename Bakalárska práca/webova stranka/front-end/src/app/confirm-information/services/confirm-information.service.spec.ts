import { TestBed } from '@angular/core/testing';

import { ConfirmInformationService } from './confirm-information.service';

describe('ConfirmInformationService', () => {
  let service: ConfirmInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
