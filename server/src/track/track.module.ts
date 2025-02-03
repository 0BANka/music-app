import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Track } from './entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Album } from 'src/album/entities/album.entity';
import { TrackHistory } from 'src/track-history/entities/track-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, User, Album, TrackHistory])],
  controllers: [TrackController],
  providers: [TrackService, UserService],
})
export class TrackModule {}
