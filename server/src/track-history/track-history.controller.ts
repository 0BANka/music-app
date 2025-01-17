import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { TrackHistoryService } from './track-history.service';
import { CreateTrackHistoryDto } from './dto/create-track-history.dto';

@Controller('track_history')
export class TrackHistoryController {
  constructor(private readonly trackHistoryService: TrackHistoryService) {}

  @Post()
  async getSecretMessage(
    @Headers() headers: { authorization: string },
    @Body() createTrackHistoryDto: CreateTrackHistoryDto,
  ) {
    if (!headers.authorization) {
      throw new UnauthorizedException('Вы не авторизованы');
    }
    const user = await this.trackHistoryService.getUserByToken(
      headers.authorization,
    );
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    return this.trackHistoryService.create(createTrackHistoryDto, user.id);
  }
}
