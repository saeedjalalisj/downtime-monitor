import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './entities/site.entity';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private readonly siteRepository: Repository<Site>,
  ) {}
  async create(createSiteDto: CreateSiteDto, userId: number) {
    try {
      const site = new Site();
      site.userId = userId;
      site.title = createSiteDto.title;
      site.url = createSiteDto.url;
      site.description = createSiteDto.description;
      site.isActive = createSiteDto.isActive;
      return await this.siteRepository.save(site);
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return `This action returns all site`;
  }

  findOne(id: number) {
    return `This action returns a #${id} site`;
  }

  update(id: number, updateSiteDto: UpdateSiteDto) {
    return `This action updates a #${id} site`;
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}
