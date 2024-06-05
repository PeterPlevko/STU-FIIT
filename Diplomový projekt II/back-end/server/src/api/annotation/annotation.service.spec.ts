import { Test, TestingModule } from '@nestjs/testing';
import { AnnotationService } from './annotation.service';

describe('AnnotationService', () => {
  let service: AnnotationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnotationService],
    }).compile();

    service = module.get<AnnotationService>(AnnotationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
