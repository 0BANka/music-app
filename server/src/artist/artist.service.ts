import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
}
