import { Module } from '@nestjs/common';
import { ScheduledBatchService } from './scheduled-batch.service';

@Module({
  providers: [ScheduledBatchService]
})
export class ScheduledBatchModule {}
