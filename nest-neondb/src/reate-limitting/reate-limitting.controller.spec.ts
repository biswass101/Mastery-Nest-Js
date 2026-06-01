import { Test, TestingModule } from '@nestjs/testing';
import { ReateLimittingController } from './reate-limitting.controller';

describe('ReateLimittingController', () => {
  let controller: ReateLimittingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReateLimittingController],
    }).compile();

    controller = module.get<ReateLimittingController>(ReateLimittingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
