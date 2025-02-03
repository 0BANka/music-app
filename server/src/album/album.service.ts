import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @InjectRepository(Track)
    private trackRepository: Repository<Track>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
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

    const album = await this.albumRepository.save({
      ...createAlbumDto,
      image: image?.filename || 'no-photo-available.png',
      user: String(user.id),
    });

    const createdAlbum = await this.findOne(album.id, token);
    return createdAlbum;
  }

  async findAll(id?: string, token?: string) {
    const currentUser = token
      ? await this.usersRepository.findOne({
          where: { token },
        })
      : null;

    let albums = [];

    if (id) {
      switch (currentUser?.role) {
        case 'admin':
          albums = await this.albumRepository.find({
            where: { artistId: id },
            relations: { artist: true },
            order: { year: 'ASC' },
          });
          break;
        case 'user':
          albums = await this.albumRepository.find({
            where: [
              { artistId: id, isPublish: true },
              { artistId: id, user: String(currentUser.id) },
            ],
            relations: { artist: true },
            order: { year: 'ASC' },
          });
          break;
        default:
          albums = await this.albumRepository.find({
            where: { artistId: id, isPublish: true },
            relations: { artist: true },
            order: { year: 'ASC' },
          });
      }

      if (albums.length > 0) {
        return this.populateAlbumsWithTracks(albums, currentUser);
      }

      const artist = await this.artistRepository.findOne({
        where: { id: String(id) },
        select: { name: true, isPublish: true },
      });

      if (artist) {
        return [
          {
            artist: {
              ...artist,
            },
          },
        ];
      }

      return [];
    }

    switch (currentUser?.role) {
      case 'admin':
        albums = await this.albumRepository.find({
          relations: { artist: true },
          order: { year: 'ASC' },
        });
        break;
      case 'user':
        albums = await this.albumRepository.find({
          where: [{ isPublish: true }, { user: String(currentUser.id) }],
          relations: { artist: true },
          order: { year: 'ASC' },
        });
        break;
      default:
        albums = await this.albumRepository.find({
          where: { isPublish: true },
          relations: { artist: true },
          order: { year: 'ASC' },
        });
    }

    if (albums.length > 0) {
      return this.populateAlbumsWithTracks(albums, currentUser);
    }

    return [];
  }

  async populateAlbumsWithTracks(albums: Album[], currentUser: User) {
    return Promise.all(
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

  async remove(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const tracks = await this.trackRepository.find({ where: { albumId: id } });

    if (tracks.length > 0) {
      await this.trackRepository.delete({ albumId: id });
    }

    return await this.albumRepository.delete(id);
  }

  async publish(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return await this.albumRepository.update(id, { isPublish: true });
  }
}
