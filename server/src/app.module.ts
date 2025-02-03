import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist/entities/artist.entity';
import { AlbumModule } from './album/album.module';
import { Album } from './album/entities/album.entity';
import { Track } from './track/entities/track.entity';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TrackHistoryModule } from './track-history/track-history.module';
import { TrackHistory } from './track-history/entities/track-history.entity';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Artist, Album, Track, TrackHistory],
      synchronize: true,
    }),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    TrackHistoryModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
