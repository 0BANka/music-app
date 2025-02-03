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
  UseGuards,
  Headers,
  Delete,
  Param,
} from '@nestjs/common';
import { storage } from 'src/storageConfig';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/user/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { Role } from 'src/role/enums/role.enum';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('track', storage))
  async create(
    @Headers() headers: { authorization: string },
    @Body() createTrackDto: CreateTrackDto,
    @UploadedFile() track: Express.Multer.File,
  ) {
    return this.trackService.create(
      createTrackDto,
      headers.authorization,
      track,
    );
  }

  @Get()
  findAll(
    @Headers() headers: { authorization: string },
    @Query('album') album?: string,
    @Query('artist') artist?: string,
  ) {
    if (album && artist) {
      throw new HttpException(
        'Можно указать только один параметр: либо альбом, либо исполнителя',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.trackService.findAll(headers.authorization, album, artist);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }

  @Post(':id/publish')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  publish(@Param('id') id: string) {
    return this.trackService.publish(id);
  }
}
