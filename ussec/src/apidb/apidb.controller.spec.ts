import { Test, TestingModule } from '@nestjs/testing';
import { ApidbController } from './apidb.controller';

describe('ApidbController', () => {
  let controller: ApidbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApidbController],
    }).compile();

    controller = module.get<ApidbController>(ApidbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
