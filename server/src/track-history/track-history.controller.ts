import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  UseGuards,
} from '@nestjs/common';
import { TrackHistoryService } from './track-history.service';
import { CreateTrackHistoryDto } from './dto/create-track-history.dto';
import { AuthGuard } from 'src/user/auth.guard';

@Controller('track_history')
export class TrackHistoryController {
  constructor(private readonly trackHistoryService: TrackHistoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Headers() headers: { authorization: string },
    @Body() createTrackHistoryDto: CreateTrackHistoryDto,
  ) {
    const user = await this.trackHistoryService.getUserByToken(
      headers.authorization,
    );

    return this.trackHistoryService.create(createTrackHistoryDto, user.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  getHistoryUser(@Headers() headers: { authorization: string }) {
    return this.trackHistoryService.getHistoryUser(headers.authorization);
  }
}
