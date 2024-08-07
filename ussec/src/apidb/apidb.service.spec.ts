import { Test, TestingModule } from '@nestjs/testing';
import { ApidbService } from './apidb.service';

describe('ApidbService', () => {
  let service: ApidbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApidbService],
    }).compile();

    service = module.get<ApidbService>(ApidbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
