import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackHistoryService } from './track-history.service';
import { TrackHistoryController } from './track-history.controller';
import { TrackHistory } from './entities/track-history.entity';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackHistory, User, Track])],
  controllers: [TrackHistoryController],
  providers: [TrackHistoryService],
})
export class TrackHistoryModule {}
