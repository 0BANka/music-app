import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Headers,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { storage } from '../storageConfig';
import { AuthGuard } from 'src/user/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role/enums/role.enum';

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

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }

  @Post(':id/publish')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  publish(@Param('id') id: string) {
    return this.artistService.publish(id);
  }
}
