import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmInformationController } from './confirm-information.controller';

describe('ConfirmInformationController', () => {
  let controller: ConfirmInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmInformationController],
    }).compile();

    controller = module.get<ConfirmInformationController>(ConfirmInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
