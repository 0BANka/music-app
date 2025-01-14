import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackHistoryService } from './track-history.service';
import { TrackHistoryController } from './track-history.controller';
import { TrackHistory } from './entities/track-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackHistory])],
  controllers: [TrackHistoryController],
  providers: [TrackHistoryService],
})
export class TrackHistoryModule {}
