import { Test, TestingModule } from '@nestjs/testing';
import { AddInformationService } from './add-information.service';

describe('AddInformationService', () => {
  let service: AddInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddInformationService],
    }).compile();

    service = module.get<AddInformationService>(AddInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
