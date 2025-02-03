import { Controller, UseGuards, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role/enums/role.enum';
import { AuthGuard } from 'src/user/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('entities-data')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  async getEntitiesData() {
    return this.adminService.getEntitiesData();
  }
}
