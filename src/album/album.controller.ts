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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './storageConfig';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  async create(
    @Body() createAlbumDto: CreateAlbumDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.albumService.create(createAlbumDto, image);
  }

  @Get()
  findAll(@Query('artist') artist?: string) {
    return this.albumService.findAll(artist);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }
}
