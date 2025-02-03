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

  async findAll(token: string) {
    const currentUser = token
      ? await this.usersRepository.findOne({
          where: { token },
        })
      : null;

    const artists = await this.artistRepository.find();

    const artistsProcessed = artists.map((artist) => {
      return {
        id: artist.id,
        name: artist.name,
        info: artist.info,
        photo: artist.photo,
        user: artist.user,
        isPublish: artist.isPublish,
        isMyPost: currentUser
          ? String(artist.user) === String(currentUser.id)
          : false,
      };
    });

    return artistsProcessed;
  }
}
