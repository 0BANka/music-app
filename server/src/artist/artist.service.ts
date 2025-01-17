import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto, photo?: Express.Multer.File) {
    return await this.artistRepository.save({
      ...createArtistDto,
      photo: photo?.filename || '',
    });
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }
}
