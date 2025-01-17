import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createAlbumDto: CreateTrackDto) {
    return await this.trackRepository.save(createAlbumDto);
  }

  async findAll(album?: string, artist?: string): Promise<Track[]> {
    if (album) {
      return this.trackRepository.find({
        where: { albumId: album },
        relations: { album: true },
      });
    } else if (artist) {
      return this.trackRepository.find({
        where: {
          album: {
            artist: {
              id: artist,
            },
          },
        },
        relations: {
          album: {
            artist: true,
          },
        },
      });
    } else {
      return this.trackRepository.find({ relations: { album: true } });
    }
  }
}
