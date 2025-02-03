import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserService } from 'src/user/user.service';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Artist, Track, Album])],
  controllers: [AdminController],
  providers: [UserService, AdminService],
})
export class AdminModule {}
