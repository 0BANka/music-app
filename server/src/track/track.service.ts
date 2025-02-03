import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { Repository } from 'typeorm';
import { parseFile } from 'music-metadata';
import { pathToFiles } from 'src/storageConfig';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  durationFormate(duration: number) {
    const seconds = Math.floor(duration || 0);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  async create(
    createTrackDto: CreateTrackDto,
    token: string,
    track?: Express.Multer.File,
  ) {
    const uniqueNumber = await this.trackRepository.find({
      where: {
        albumId: createTrackDto.albumId,
        trackNumber: createTrackDto.trackNumber,
      },
    });
    if (uniqueNumber.length > 0) {
      throw new BadRequestException('Duplicate track number');
    }

    const user = await this.usersRepository.findOne({
      where: {
        token,
      },
    });

    if (createTrackDto.youtubeLink) {
      const formateYouTubeLink = this.extractYouTubeCode(
        createTrackDto.youtubeLink,
      );

      if (formateYouTubeLink) {
        createTrackDto.youtubeLink = formateYouTubeLink;
      }
    }

    if (track?.filename && !createTrackDto.duration) {
      try {
        const pathAudio = path.join(pathToFiles, track.filename);
        const metadata = await parseFile(pathAudio);

        if (metadata.format.duration) {
          const duration = this.durationFormate(metadata.format.duration);
          createTrackDto.duration = duration;
        } else {
          throw new BadRequestException('Invalid duration');
        }
      } catch {
        throw new BadRequestException('Invalid file');
      }
    }

    return await this.trackRepository.save({
      ...createTrackDto,
      user: String(user.id),
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

  async findAll(token?: string, album?: string, artist?: string) {
    const currentUser = token
      ? await this.usersRepository.findOne({ where: { token } })
      : null;

    const whereCondition: {
      albumId?: string;
      album?: { artist: { id: string } };
    } = {};

    if (album) {
      whereCondition.albumId = album;
    } else if (artist) {
      whereCondition.album = { artist: { id: artist } };
    }

    const tracks = await this.trackRepository.find({
      where: whereCondition,
      relations: { album: { artist: true } },
      order: { trackNumber: 'ASC' },
    });

    const tracksProcessed = tracks.map((track) => ({
      ...track,
      createdByMe: currentUser
        ? String(track.user) === String(currentUser.id)
        : false,
    }));

    return tracksProcessed;
  }
}
