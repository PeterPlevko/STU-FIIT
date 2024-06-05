import { TestBed } from '@angular/core/testing';

import { AddInformationService } from './add-information.service';

describe('AddInformationService', () => {
  let service: AddInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
