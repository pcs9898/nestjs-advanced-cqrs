import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledBatchService } from './scheduled-batch.service';

describe('ScheduledBatchService', () => {
  let service: ScheduledBatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduledBatchService],
    }).compile();

    service = module.get<ScheduledBatchService>(ScheduledBatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
