import { Module } from '@nestjs/common';
import { TrackHistoryService } from './track-history.service';
import { TrackHistoryController } from './track-history.controller';

@Module({
  controllers: [TrackHistoryController],
  providers: [TrackHistoryService],
})
export class TrackHistoryModule {}
