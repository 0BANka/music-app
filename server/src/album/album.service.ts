import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto, image?: Express.Multer.File) {
    return await this.albumRepository.save({
      ...createAlbumDto,
      image: image?.filename || 'no-photo-available.png',
    });
  }

  async findAll(id?: string): Promise<Album[]> {
    return id
      ? this.albumRepository.find({
          where: { artistId: id },
          relations: { artist: true },
          order: { year: 'ASC' },
        })
      : this.albumRepository.find({
          relations: { artist: true },
          order: { year: 'ASC' },
        });
  }

  async findOne(id: string): Promise<Album> {
    return this.albumRepository.findOne({
      where: { id },
      relations: { artist: true },
    });
  }
}
