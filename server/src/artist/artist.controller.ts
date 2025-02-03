import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../storageConfig';
import { AuthGuard } from 'src/user/auth.guard';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('photo', storage))
  async create(
    @Headers() headers: { authorization: string },
    @Body() createArtistDto: CreateArtistDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.artistService.create(
      createArtistDto,
      headers.authorization,
      photo,
    );
  }

  @Get()
  findAll(@Headers() headers: { authorization: string }) {
    return this.artistService.findAll(headers.authorization);
  }
}
