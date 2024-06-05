import { Test, TestingModule } from '@nestjs/testing';
import { AnnotationController } from './annotation.controller';

describe('AnnotationController', () => {
  let controller: AnnotationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnotationController],
    }).compile();

    controller = module.get<AnnotationController>(AnnotationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
