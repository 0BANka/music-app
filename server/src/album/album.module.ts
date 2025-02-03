import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Album } from './entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Artist } from 'src/artist/entities/artist.entity';
import { TrackHistory } from 'src/track-history/entities/track-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album, Track, User, Artist, TrackHistory]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, UserService],
})
export class AlbumModule {}
