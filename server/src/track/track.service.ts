import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(createTrackDto: CreateTrackDto, track?: Express.Multer.File) {
    const uniqueNumber = await this.trackRepository.find({
      where: {
        albumId: createTrackDto.albumId,
        trackNumber: createTrackDto.trackNumber,
      },
    });
    if (uniqueNumber.length > 0) {
      throw new BadRequestException('Duplicate track number');
    }

    if (createTrackDto.youtubeLink) {
      const formateYouTubeLink = this.extractYouTubeCode(
        createTrackDto.youtubeLink,
      );

      if (formateYouTubeLink) {
        createTrackDto.youtubeLink = formateYouTubeLink;
      }
    }

    return await this.trackRepository.save({
      ...createTrackDto,
      youtubeLink: createTrackDto.youtubeLink || '',
      track: track?.filename || '',
    });
  }

  extractYouTubeCode(url: string) {
    const firstUrlReg = /youtu\.be\/([\w-]+)/;
    const secondUrlReg = /youtube\.com\/.*[?&]v=([\w-]+)/;

    const firstCode = url.match(firstUrlReg);
    if (firstCode) {
      return firstCode[1];
    }

    const secondCode = url.match(secondUrlReg);
    if (secondCode) {
      return secondCode[1];
    }

    return null;
  }

  async findAll(album?: string, artist?: string): Promise<Track[]> {
    if (album) {
      return this.trackRepository.find({
        where: { albumId: album },
        relations: {
          album: {
            artist: true,
          },
        },
        order: { trackNumber: 'ASC' },
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
        order: { trackNumber: 'ASC' },
      });
    } else {
      return this.trackRepository.find({
        relations: { album: true },
        order: { trackNumber: 'ASC' },
      });
    }
  }
}
