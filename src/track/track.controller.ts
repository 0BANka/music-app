import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpException,
  Param,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tracks')
export class AlbumController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll(@Query('album') album?: string, @Query('artist') artist?: string) {
    if (album && artist) {
      throw new HttpException(
        'Можно указать только один параметр: либо альбом, либо исполнителя',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.trackService.findAll(artist, album);
  }
}
