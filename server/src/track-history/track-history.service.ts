import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  getUserByToken(token: string) {
    return this.usersRepository.findOne({
      where: { token },
    });
  }
}
