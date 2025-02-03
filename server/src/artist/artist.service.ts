import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { User } from 'src/user/entities/user.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { TrackHistory } from 'src/track-history/entities/track-history.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @InjectRepository(Track)
    private trackRepository: Repository<Track>,

    @InjectRepository(TrackHistory)
    private trackHistoryRepository: Repository<TrackHistory>,
  ) {}

  async create(
    createArtistDto: CreateArtistDto,
    token: string,
    photo?: Express.Multer.File,
  ) {
    const user = await this.usersRepository.findOne({
      where: {
        token,
      },
    });

    return await this.artistRepository.save({
      ...createArtistDto,
      photo: photo?.filename || 'no-photo-available.png',
      user: String(user.id),
    });
  }

  async findAll(token?: string) {
    const currentUser = token
      ? await this.usersRepository.findOne({ where: { token } })
      : null;

    let artists = [];

    switch (currentUser?.role) {
      case 'admin':
        artists = await this.artistRepository.find();
        break;
      case 'user':
        artists = await this.artistRepository.find({
          where: [{ isPublish: true }, { user: String(currentUser.id) }],
        });
        break;
      default:
        artists = await this.artistRepository.find({
          where: { isPublish: true },
        });
    }

    return artists.map((artist) => ({
      ...artist,
      createdByMe: currentUser ? artist.user === currentUser.id : false,
    }));
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const albums = await this.albumRepository.find({ where: { artistId: id } });

    if (albums.length > 0) {
      const albumIds = albums.map((album) => album.id);

      const tracks = await this.trackRepository.find({
        where: { albumId: In(albumIds) },
      });

      if (tracks.length > 0) {
        const trackIds = tracks.map((track) => track.id);

        await this.trackHistoryRepository.delete({ track: In(trackIds) });

        await this.trackRepository.delete({ albumId: In(albumIds) });
      }

      await this.albumRepository.delete({ artistId: id });
    }

    await this.artistRepository.delete(id);

    return artist;
  }

  async publish(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return await this.artistRepository.update(id, { isPublish: true });
  }
}
