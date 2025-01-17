import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';

export interface AlbumWithNumberOfTracks extends Album {
  numberOfTracks?: number;
}

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto, image?: Express.Multer.File) {
    return await this.albumRepository.save({
      ...createAlbumDto,
      image: image?.filename || 'no-photo-available.png',
    });
  }

  async findAll(id?: string): Promise<AlbumWithNumberOfTracks[]> {
    if (id) {
      const albums = await this.albumRepository.find({
        where: { artistId: id },
        relations: { artist: true },
        order: { year: 'ASC' },
      });

      if (albums.length > 0) {
        const albumsWithTracks = await Promise.all(
          albums.map(async (album) => {
            const tracksCount = await this.trackRepository.count({
              where: { albumId: album.id },
            });

            return {
              ...album,
              numberOfTracks: tracksCount,
            };
          }),
        );

        return albumsWithTracks;
      }
    } else {
      const albums = await this.albumRepository.find({
        relations: { artist: true },
        order: { year: 'ASC' },
      });

      if (albums.length > 0) {
        const albumsWithTracks = await Promise.all(
          albums.map(async (album) => {
            const tracksCount = await this.trackRepository.count({
              where: { albumId: album.id },
            });

            return {
              ...album,
              numberOfTracks: tracksCount,
            };
          }),
        );

        return albumsWithTracks;
      }
    }
  }

  async findOne(id: string): Promise<Album> {
    return this.albumRepository.findOne({
      where: { id },
      relations: { artist: true },
    });
  }
}
