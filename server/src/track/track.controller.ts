import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { storage } from 'src/storageConfig';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(FileInterceptor('track', storage))
  async create(
    @Body() createTrackDto: CreateTrackDto,
    @UploadedFile() track: Express.Multer.File,
  ) {
    return this.trackService.create(createTrackDto, track);
  }

  @Get()
  findAll(@Query('album') album?: string, @Query('artist') artist?: string) {
    if (album && artist) {
      throw new HttpException(
        'Можно указать только один параметр: либо альбом, либо исполнителя',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.trackService.findAll(album, artist);
  }
}
