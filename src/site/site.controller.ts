import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { User } from '../common/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSiteDto: CreateSiteDto, @User() user) {
    return this.siteService.create(createSiteDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.siteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSiteDto: UpdateSiteDto,
    @User() user,
  ) {
    return this.siteService.update(+id, updateSiteDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(+id);
  }
}
