import { Test, TestingModule } from '@nestjs/testing';
import { AddInformationController } from './add-information.controller';

describe('AddInformationController', () => {
  let controller: AddInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddInformationController],
    }).compile();

    controller = module.get<AddInformationController>(AddInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
