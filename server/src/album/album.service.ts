import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @InjectRepository(Track)
    private trackRepository: Repository<Track>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createAlbumDto: CreateAlbumDto,
    token: string,
    image?: Express.Multer.File,
  ) {
    const user = await this.usersRepository.findOne({
      where: {
        token,
      },
    });

    return await this.albumRepository.save({
      ...createAlbumDto,
      image: image?.filename || 'no-photo-available.png',
      user: String(user.id),
    });
  }

  async findAll(id?: string, token?: string) {
    const currentUser = token
      ? await this.usersRepository.findOne({
          where: { token },
        })
      : null;

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
              createdByMe: currentUser
                ? String(album.user) === String(currentUser.id)
                : false,
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
              createdByMe: currentUser
                ? String(album.user) === String(currentUser.id)
                : false,
            };
          }),
        );

        return albumsWithTracks;
      }
    }
  }

  async findOne(id: string, token?: string) {
    const currentUser = token
      ? await this.usersRepository.findOne({
          where: { token },
        })
      : null;

    const album = await this.albumRepository.findOne({
      where: { id },
      relations: { artist: true },
    });

    return {
      ...album,
      createdByMe: currentUser
        ? String(album.user) === String(currentUser.id)
        : false,
    };
  }
}
