import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../storageConfig';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', storage))
  async create(
    @Body() createArtistDto: CreateArtistDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.artistService.create(createArtistDto, photo);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }
}
