import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTrackHistoryDto } from './dto/create-track-history.dto';
import { TrackHistory } from './entities/track-history.entity';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class TrackHistoryService {
  constructor(
    @InjectRepository(TrackHistory)
    private trackHistoryRepository: Repository<TrackHistory>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackHistoryDto: CreateTrackHistoryDto, userId: number) {
    const existingTrack = await this.tracksRepository.findOne({
      where: { id: createTrackHistoryDto.track },
    });

    if (!existingTrack) {
      throw new NotFoundException('Track not found');
    }

    const currentDate = new Date().toISOString();

    return this.trackHistoryRepository.save({
      user: String(userId),
      track: createTrackHistoryDto.track,
      datetime: currentDate,
    });
  }

  async getHistoryUser(token: string) {
    const user = await this.usersRepository.findOne({
      where: { token },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const history = await this.trackHistoryRepository.find({
      where: { user: String(user.id) },
      relations: { trackId: true },
      order: { datetime: 'DESC' },
    });

    if (history.length === 0) {
      return [];
    }

    const trackIds = history.map((track) => track.track);

    const tracks = await this.tracksRepository.find({
      where: { id: In(trackIds) },
      relations: {
        album: {
          artist: true,
        },
      },
    });

    const result = history.map((element) => {
      const track = tracks.find(
        (track) => track.id.toString() === element.track.toString(),
      );

      return {
        track: track.name,
        artist: track.album?.artist?.name,
        datetime: element.datetime,
      };
    });

    return result;
  }

  getUserByToken(token: string) {
    return this.usersRepository.findOne({
      where: { token },
    });
  }
}
