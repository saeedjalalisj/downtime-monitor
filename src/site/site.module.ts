import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { Site } from './entities/site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Site])],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
