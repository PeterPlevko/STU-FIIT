import { Test, TestingModule } from '@nestjs/testing';
import { ShowInformationController } from './show-information.controller';

describe('ShowInformationController', () => {
  let controller: ShowInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowInformationController],
    }).compile();

    controller = module.get<ShowInformationController>(ShowInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
