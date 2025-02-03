import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';
import { Repository } from 'typeorm';
import { parseFile } from 'music-metadata';
import { pathToFiles } from 'src/storageConfig';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Album } from 'src/album/entities/album.entity';
import { TrackHistory } from 'src/track-history/entities/track-history.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @InjectRepository(TrackHistory)
    private trackHistoryRepository: Repository<TrackHistory>,
  ) {}

  durationFormate(duration: number) {
    const totalSeconds = Math.floor(duration || 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

    if (
      createTrackDto.youtubeLink &&
      createTrackDto.youtubeLink !== undefined
    ) {
      const formateYouTubeLink = this.extractYouTubeCode(
        createTrackDto.youtubeLink,
      );

      if (formateYouTubeLink) {
        createTrackDto.youtubeLink = formateYouTubeLink;
      } else {
        throw new BadRequestException(
          'Invalid YouTube link. The link must be in the following format: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID?si=abcdefgh12345',
        );
      }
    }

    if (createTrackDto.duration) {
      const durationRegex = /^\d{1,2}:\d{2}$/;

      if (!durationRegex.test(createTrackDto.duration)) {
        if (track?.filename) {
          createTrackDto.duration = '';
        } else {
          throw new BadRequestException('Invalid duration');
        }
      } else {
        const [minutes, seconds] = createTrackDto.duration
          .split(':')
          .map(Number);
        createTrackDto.duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }

    if (track?.filename && !createTrackDto.duration) {
      try {
        const pathAudio = path.join(pathToFiles, track.filename);
        const metadata = await parseFile(pathAudio);

        if (!metadata.format.duration) {
          throw new BadRequestException('Invalid duration');
        }

        createTrackDto.duration = this.durationFormate(
          metadata.format.duration,
        );
      } catch (error) {
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

    let tracks = [];

    if (album) {
      switch (currentUser?.role) {
        case 'admin':
          tracks = await this.trackRepository.find({
            where: { albumId: album },
            relations: {
              album: { artist: true },
            },
            order: { trackNumber: 'ASC' },
          });
          break;
        case 'user':
          tracks = await this.trackRepository.find({
            where: [
              { isPublish: true, albumId: album },
              { user: String(currentUser.id), albumId: album },
            ],
            relations: {
              album: { artist: true },
            },
            order: { trackNumber: 'ASC' },
          });
          break;
        default:
          tracks = await this.trackRepository.find({
            where: { isPublish: true, albumId: album },
            relations: {
              album: { artist: true },
            },
            order: { trackNumber: 'ASC' },
          });
      }
    } else if (artist) {
      switch (currentUser?.role) {
        case 'admin':
          tracks = await this.trackRepository.find({
            where: {
              album: {
                artist: { id: artist },
              },
            },
            relations: {
              album: { artist: true },
            },
            order: { trackNumber: 'ASC' },
          });
          break;
        case 'user':
          tracks = await this.trackRepository.find({
            where: [
              {
                isPublish: true,
                album: {
                  artist: { id: artist },
                },
              },
              {
                user: String(currentUser.id),
                album: {
                  artist: { id: artist },
                },
              },
            ],
          });
          break;
        default:
          tracks = await this.trackRepository.find({
            where: {
              isPublish: true,
              album: {
                artist: { id: artist },
              },
            },
          });
      }
    }

    const tracksProcessed = tracks.map((track) => ({
      ...track,
      createdByMe: currentUser
        ? String(track.user) === String(currentUser.id)
        : false,
    }));

    if (tracksProcessed.length === 0) {
      if (album) {
        const existingAlbum = await this.albumRepository.find({
          where: { id: album },
          relations: { artist: true },
          select: { name: true, isPublish: true },
        });

        return [
          {
            album: {
              name: existingAlbum[0].name,
              isPublish: existingAlbum[0].isPublish,
              artist: {
                name: existingAlbum[0].artist.name,
              },
            },
          },
        ];
      }
    }

    return tracksProcessed;
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.trackHistoryRepository.delete({ track: id });

    await this.trackRepository.delete(id);

    return track;
  }

  async publish(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return await this.trackRepository.update(id, { isPublish: true });
  }
}
