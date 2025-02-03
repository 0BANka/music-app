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
  UseGuards,
  Headers,
  Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../storageConfig';
import { AuthGuard } from 'src/user/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', storage))
  async create(
    @Headers() headers: { authorization: string },
    @Body() createAlbumDto: CreateAlbumDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.albumService.create(
      createAlbumDto,
      headers.authorization,
      image,
    );
  }

  @Get()
  findAll(
    @Headers() headers: { authorization: string },
    @Query('artist') artist?: string,
  ) {
    return this.albumService.findAll(artist, headers.authorization);
  }

  @Get(':id')
  async findOne(
    @Headers() headers: { authorization: string },
    @Param('id') id: string,
  ) {
    const album = await this.albumService.findOne(id, headers.authorization);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }

  @Post(':id/publish')
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  publish(@Param('id') id: string) {
    return this.albumService.publish(id);
  }
}
