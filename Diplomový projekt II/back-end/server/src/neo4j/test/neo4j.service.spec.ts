import { Test, TestingModule } from '@nestjs/testing';
import { QueryRepository } from '../query.repository';

describe('QueryRepository', () => {
  let service: QueryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryRepository],
    }).compile();

    service = module.get<QueryRepository>(QueryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
