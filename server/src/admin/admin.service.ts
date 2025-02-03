import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,

    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,

    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async getEntitiesData() {
    const tracks = await this.trackRepository.find({
      relations: { userId: true },
      select: ['id', 'name', 'isPublish', 'user'],
    });

    const artists = await this.artistRepository.find({
      relations: { userId: true },
      select: ['id', 'name', 'isPublish', 'user'],
    });

    const albums = await this.albumRepository.find({
      relations: { userId: true },
      select: ['id', 'name', 'isPublish', 'user'],
    });

    const processedTracks = await Promise.all(
      tracks.map((track) => ({
        id: track.id,
        name: track.name,
        isPublish: track.isPublish,
        user: track.userId.username,
        type: 'track',
      })),
    );

    const processedArtists = artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      isPublish: artist.isPublish,
      user: artist.userId.username,
      type: 'artist',
    }));

    const processedAlbums = albums.map((album) => ({
      id: album.id,
      name: album.name,
      isPublish: album.isPublish,
      user: album.userId.username,
      type: 'album',
    }));

    const allEntities = [
      ...processedArtists,
      ...processedAlbums,
      ...processedTracks,
    ];

    return allEntities;
  }
}
