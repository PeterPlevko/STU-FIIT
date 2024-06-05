import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmInformationService } from './confirm-information.service';

describe('ConfirmInformationService', () => {
  let service: ConfirmInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmInformationService],
    }).compile();

    service = module.get<ConfirmInformationService>(ConfirmInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
