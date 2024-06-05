import { Test, TestingModule } from '@nestjs/testing';
import { ShowInformationService } from './show-information.service';

describe('ShowInformationService', () => {
  let service: ShowInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowInformationService],
    }).compile();

    service = module.get<ShowInformationService>(ShowInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
